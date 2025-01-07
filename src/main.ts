import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from '../src/environments/environment.prod';

if (environment.production) {
  // Override console methods to suppress logs/*
  /*console.log = () => {};
  console.debug = () => {};
  console.warn = () => {}; */
  // console.error = () => {}; // Optional, depending on requirements
}
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
