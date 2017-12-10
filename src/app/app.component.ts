import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  counter:number;
  pause:boolean = false;
  timerActive:boolean = false;

  setTimer = (time:number) => {
    this.counter = time;
    this.startTimer();
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
        if(this.counter > 0 && this.pause == false) { 
          this.counter -= 1;
          this.timer();
        }
        else
          this.timerActive = false;
      }, 1000);
  }
}
