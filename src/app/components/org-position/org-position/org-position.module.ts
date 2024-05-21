import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeComponent } from '../../pipe/pipe.component';
import { CheckValuePipe } from '../../check-value.pipe';
import { DisplayCheckPipe } from '../../pipe/display-check.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrgPositionComponent } from '../org-position.component';
import { ShareModule } from '../../../../module/share-module/share-module.module';
import { DiagramModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';


@NgModule({
  declarations: [OrgPositionComponent],
  imports: [
    CommonModule,NgxSpinnerModule,ShareModule,DiagramModule,OverviewAllModule
  ]
})
export class OrgPositionModule { }
