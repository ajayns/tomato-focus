import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PushNotificationsService } from 'ng-push';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    @ViewChild('bar') bar: ElementRef;

    public time: number;
    public count: number;

    public focus: boolean;
    public pause: boolean;
    public timerActive: boolean;

    public currentState: number;
    public currentStateName: string;

    public shortBreakTime: number;
    public longBreakTime: number;
    public focusTime: number;

    public audio: HTMLAudioElement;

    constructor(private pushNotifications: PushNotificationsService) {
        this.time = 0;

        this.focus = false;
        this.pause = false;
        this.timerActive = false;

        this.currentState = 0;
        this.currentStateName = 'set timer';

        this.shortBreakTime = 300;
        this.longBreakTime = 900;
        this.focusTime = 1500;

        this.audio = new Audio();
    }

    ngOnInit() {
        this.pushNotifications.requestPermission();
        this.audio.src = "../assets/beep.mp3";
        this.audio.load();
    }

    notify() {
        let options = {
            body: `Your ${this.currentStateName} has ended.`,
            icon: '../assets/icon-256.png'
        };

        this.pushNotifications.create('Timeout!', options)
            .subscribe(res => {
                if (res.event.type === 'click')
                    res.notification.close();
            });
    }

    public setTimer(time: number, focus: boolean = false) {
        this.currentState = time;
        this.setTimerSvg(time);

        this.currentStateName = this.changeCurrentState(time);

        this.focus = focus;
        this.time = time;
        this.startTimer();
    }

    private changeCurrentState(time: number): string {
        switch (time) {
            case this.shortBreakTime:
                return 'short break';
            case this.longBreakTime:
                return 'long break';
            case this.focusTime:
                return 'focus';
            default:
                return 'set timer';
        }
    }

    public setTimerSvg(time: number) {
        this.bar.nativeElement.style.strokeDashoffset = this.changeBarStroke(time);
    }

    private changeBarStroke(time: number): string {
        if (time === 0) {
            return '0';
        }

        return (848.23 * (1 - time / this.currentState)).toString();
    }

    public startFocus() {
        this.focus = true;
        this.count = 0;
        this.setTimer(this.focusTime, true);
    }

    public togglePause() {
        this.pause = !this.pause;
        this.startTimer();
    }

    public startTimer() {
        if (!this.timerActive || this.currentState == 0) {
            this.timerActive = true;
            this.timer();
        }
    }

    public timer() {
        if (this.time > 0 && !this.pause) {
            setTimeout(() => {
                if (this.time > 0) {
                    if (this.time - 1 == 0) {
                        this.timerActive = false;
                        this.audio.play();
                        this.notify();
                    }
                    this.time -= 1;
                    this.setTimerSvg(this.time);
                    this.timer();
                }
            }, 1000);
        } else {
            this.timerActive = false;
            if (this.focus && !this.pause) {
                this.count++;
                if (this.count % 7 == 0)
                    this.setTimer(this.longBreakTime, true);
                else if (this.count % 2 == 0)
                    this.setTimer(this.focusTime, true);
                else
                    this.setTimer(this.shortBreakTime, true);
            }
        }

    }
}
