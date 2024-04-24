import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { AccumulationAnnotationService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ChartAllModule } from '@syncfusion/ej2-angular-charts';

import { DiagramAllModule, SymbolPaletteAllModule, OverviewAllModule, HierarchicalTreeService, MindMapService, RadialTreeService, ComplexHierarchicalTreeService, DataBindingService, SnappingService, PrintAndExportService, BpmnDiagramsService, SymmetricLayoutService, ConnectorBridgingService, UndoRedoService, DiagramContextMenuService, ConnectorEditingService, LayoutAnimationService } from '@syncfusion/ej2-angular-diagrams';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';

import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

import { HttpClientModule } from '@angular/common/http';

import { HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule,RouterLink,RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { CustomerModelComponent } from './customer-model/customer-model.component';

import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective, AccordionModule } from '@syncfusion/ej2-angular-navigations';

import { AppComponent } from './app.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SpinnerLoadingComponent } from './components/spinner-loading/spinner-loading.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrgChartDiagramComponent } from './org-chart-diagram/org-chart-diagram.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TestUnitComponent } from './components/test-unit/test-unit.component';
@NgModule({
  declarations: [AppComponent,CustomerModelComponent,SpinnerLoadingComponent, OrgChartDiagramComponent, TestUnitComponent], 
  imports: [
    AppRoutingModule,RouterLink,RouterOutlet,NgxSpinnerModule,
    RouterModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    NgbModule,
    DiagramAllModule,
    ChartAllModule,
    GridAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    ButtonModule,
    ColorPickerModule,
    DateRangePickerModule,
    CheckBoxModule,
    AccumulationChartModule,
    BrowserModule,
    ToolbarModule,
    DropDownButtonModule,
    UploaderModule,
    CircularGaugeModule,
    DropDownListAllModule,
    ListViewAllModule,
    DialogAllModule,
    TextBoxModule,
    RadioButtonModule,
    MultiSelectModule,
    NumericTextBoxModule,
    BrowserModule,
    AccordionModule,
    FormsModule, 
    ReactiveFormsModule ,
    CommonModule,
    NgSelectModule,
    MatProgressSpinner,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync(),
    HierarchicalTreeService,
    MindMapService,
    RadialTreeService,
    ComplexHierarchicalTreeService,
    DataBindingService,
    SnappingService,
    PrintAndExportService,
    BpmnDiagramsService,
    SymmetricLayoutService,
    ConnectorBridgingService,
    UndoRedoService,
    DiagramContextMenuService,
    ConnectorEditingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




