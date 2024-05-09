/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base'
import { AppModule } from './app/app.module';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCeExzWmFZfVpgdVRMZFlbQXRPIiBoS35RckVmWXlcc3BQQ2NbWUx0');

platformBrowserDynamic().bootstrapModule(AppModule).then(ref =>{

})
  .catch(err => console.error(err));
