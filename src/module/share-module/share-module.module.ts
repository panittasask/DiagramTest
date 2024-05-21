import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeComponent } from '../../app/components/pipe/pipe.component';
import { CheckValuePipe } from '../../app/components/check-value.pipe';
import { DisplayCheckPipe } from '../../app/components/pipe/display-check.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TopmenuComponent } from '../../app/components/topmenu/topmenu.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { BpmnDiagramsService, ComplexHierarchicalTreeService, ConnectorEditingService, DataBindingService, DiagramContextMenuService, HierarchicalTreeService, LayoutAnimationService, MindMapService, PrintAndExportService, RadialTreeService, SnappingService, SymmetricLayoutService, UndoRedoService } from '@syncfusion/ej2-angular-diagrams';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
FormsModule
@NgModule({
  declarations: [
    DisplayCheckPipe,CheckValuePipe,PipeComponent,TopmenuComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    DiagramModule,
    NgSelectModule,FormsModule
  ],
  exports:[
    DisplayCheckPipe,CheckValuePipe,PipeComponent,TopmenuComponent
  ],
  providers:[
    HierarchicalTreeService,
    MindMapService,
    RadialTreeService,
    ComplexHierarchicalTreeService,
    DataBindingService,
    SnappingService,
    PrintAndExportService,
    BpmnDiagramsService,
    SymmetricLayoutService,
    // ConnectorBridgingService,
    UndoRedoService,
    DiagramContextMenuService,
    ConnectorEditingService,
    LayoutAnimationService,
  ]
})
export class ShareModule { }
