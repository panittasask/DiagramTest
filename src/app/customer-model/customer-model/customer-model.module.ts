import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../../module/share-module/share-module.module';
import { CustomerModelComponent } from '../customer-model.component';
import { DiagramModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CustomerModelComponent],
  imports: [
    CommonModule,
    DiagramModule,NgxSpinnerModule,
    ShareModule,
    OverviewAllModule,NgSelectModule
  ]
})
export class CustomerModelModule { }
