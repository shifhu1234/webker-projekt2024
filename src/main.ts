import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {provideHttpClient} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {bootstrapApplication} from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
  // bootstrapApplication(AppComponent, {
  //   providers: [
  //     provideHttpClient(),
  //   ],
  // }).then(_ => {});

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//   ],
// }).then(_ => {});
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

