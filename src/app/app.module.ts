import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';


import { AppComponent } from './app.component';
import { MinuteSecondsPipe } from './minute-seconds.pipe';

import { environment } from '../environments/environment'


@NgModule({
  declarations: [
    AppComponent,
    MinuteSecondsPipe
  ],
  imports: [
    BrowserModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
