/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base'
import { AppModule } from './app/app.module';

//registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31acnVVQmBYUkB1Vg==');

platformBrowserDynamic().bootstrapModule(AppModule).then(ref =>{
  
})
  .catch(err => console.error(err));
