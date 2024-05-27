import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../../module/share-module/share-module.module';
import { OrgChartDiagramComponent } from '../org-chart-diagram.component';
import { DiagramModule, OverviewAllModule } from '@syncfusion/ej2-angular-diagrams';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { SpinnerLoadingComponent } from '../../components/spinner-loading/spinner-loading.component';

@NgModule({
  declarations: [OrgChartDiagramComponent],
  imports: [
    CommonModule,
    DiagramModule,NgxSpinnerModule,
    ShareModule,
    OverviewAllModule,NgSelectModule
  ]
})
export class OrgChartDiagramModule { }
