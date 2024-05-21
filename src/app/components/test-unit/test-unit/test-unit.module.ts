import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestUnitComponent } from '../test-unit.component';
import { DiagramModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { TopmenuComponent } from '../../topmenu/topmenu.component';
import { PipeComponent } from '../../pipe/pipe.component';
import { CheckValuePipe } from '../../check-value.pipe';
import { DisplayCheckPipe } from '../../pipe/display-check.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShareModule } from '../../../../module/share-module/share-module.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    TestUnitComponent
  ],
  imports: [
    CommonModule,
    DiagramModule,NgxSpinnerModule,
    ShareModule,
    OverviewAllModule,NgSelectModule
  ]
})
export class TestUnitModule { }
