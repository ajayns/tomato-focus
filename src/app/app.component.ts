import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  time:number = 0;
  count:number;

  focus:boolean = false;
  pause:boolean = false;
  timerActive:boolean = false;

  setTimer = (time:number,focus:boolean = false) => {
    this.focus = focus;
    this.time = time;
    this.startTimer();
  }

  startFocus = () => {
    this.focus = true;
    this.count = 0;
    this.setTimer(25,true);
  }

  togglePause = () => {
    this.pause = !this.pause;
    this.startTimer();
  }

  startTimer = () => {
    if(!this.timerActive) {
      this.timerActive = true;
      this.timer();
    }
  }
   
  timer = () => {
      setTimeout(() => {
        if (this.time > 0 && !this.pause) { 
          this.time -= 1;
          this.timer();
        }
        else {
          this.timerActive = false;
          if (this.focus && !this.pause) {
            this.count++;
            if (this.count % 7 == 0)
              this.setTimer(15, true);
            else if (this.count % 2 == 0) 
              this.setTimer(25, true);
            else
              this.setTimer(5, true);            
          }
        }
      }, 1000);
  }
}
