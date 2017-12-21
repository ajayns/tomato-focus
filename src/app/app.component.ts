import { Component } from '@angular/core';
import { ElementSchemaRegistry } from '@angular/compiler';

import { PushNotificationsService } from 'ng-push';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  time:number = 0;
  count:number;

  focus:boolean = false;
  pause:boolean = false;
  timerActive:boolean = false;

  currentState:number = 0;
  currentStateName:string = 'set timer';

  shortBreakTime:number = 300;
  longBreakTime:number = 900;
  focusTime:number = 1500;

  audio = new Audio();

  constructor(private _pushNotifications: PushNotificationsService) {}

  ngOnInit() {
    this._pushNotifications.requestPermission();
    this.audio.src = "../assets/beep.mp3";
    this.audio.load();
  }

  setTimer = (time:number, focus:boolean = false) => {
    this.currentState = time;
    this.setTimerSvg(time);

    if (time == this.shortBreakTime)
      this.currentStateName = 'short break';
    else if (time == this.longBreakTime)
      this.currentStateName = 'long break';
    else if (time == this.focusTime)
      this.currentStateName = 'focus';
    else
      this.currentStateName = 'set timer';
    
    this.focus = focus;
    this.time = time;
    this.startTimer();
  }

  setTimerSvg = (time:number) => {
    if(time == 0)
      document.getElementById('bar').style.strokeDashoffset = '0';
    else
      document.getElementById('bar').style.strokeDashoffset = (848.23 * (1 - time / this.currentState)).toString();
  }

  startFocus = () => {
    this.focus = true;
    this.count = 0;
    this.setTimer(this.focusTime, true);
  }

  togglePause = () => {
    this.pause = !this.pause;
    this.startTimer();
  }

  startTimer = () => {
    if(!this.timerActive || this.currentState == 0) {
      this.timerActive = true;
      this.timer();
    }
  }
   
  timer = () => {
    if (this.time > 0 && !this.pause) { 
      setTimeout(() => {
        if(this.time > 0) {
          if (this.time - 1 == 0) {
            this.timerActive = false;
            this.audio.play();
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
