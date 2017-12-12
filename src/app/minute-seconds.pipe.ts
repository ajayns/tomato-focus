import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    let minutes: any = Math.floor(value / 60);
    let seconds: any = value - minutes * 60;

    if(Math.floor(minutes / 10) == 0)
      minutes = '0' + minutes;
    if(Math.floor((value - minutes * 60) / 10) == 0) {
      seconds = '0' + seconds;
    }  
      
    return minutes + ':' + seconds;
  }

}
