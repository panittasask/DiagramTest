import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { AccumulationAnnotationService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, ChartAllModule } from '@syncfusion/ej2-angular-charts';

import { LayoutAnimation, SymbolPaletteAllModule, OverviewAllModule, HierarchicalTreeService, MindMapService, RadialTreeService, ComplexHierarchicalTreeService, DataBindingService, SnappingService, PrintAndExportService, BpmnDiagramsService, SymmetricLayoutService, ConnectorBridgingService, UndoRedoService, DiagramContextMenuService, ConnectorEditingService, LayoutAnimationService } from '@syncfusion/ej2-angular-diagrams';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

import { ComboBoxAllModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

import { ToolbarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { NumericTextBoxModule, ColorPickerModule, UploaderModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { DropDownButtonModule, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { OrgPositionComponent } from './components/org-position/org-position.component';
import { PipeComponent } from './components/pipe/pipe.component';
import { CheckValuePipe } from './components/check-value.pipe';
import { DisplayCheckPipe } from './components/pipe/display-check.pipe';
import { InterceptorService } from './services/interceptor-service.service';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TestUnitModule } from './components/test-unit/test-unit/test-unit.module';
import { OrgPositionModule } from './components/org-position/org-position/org-position.module';
import { ShareModule } from '../module/share-module/share-module.module';
@NgModule({
  declarations: [AppComponent,SpinnerLoadingComponent],
  imports: [
    ShareModule,FormsModule,
    AppRoutingModule,RouterLink,RouterOutlet,
    RouterModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    NgbModule,
    ChartAllModule,
    GridAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    ButtonModule,
    ColorPickerModule,
    DateRangePickerModule,
    CheckBoxModule,
    AccumulationChartModule,
    BrowserModule,NgSelectModule,
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
    MatProgressSpinner,
    HttpClientModule,
    ChartAllModule,
    GridAllModule,
    SymbolPaletteAllModule,
    OverviewAllModule,
    ButtonModule,
    ColorPickerModule,
    DateRangePickerModule,
    CheckBoxModule,
    AccumulationChartModule,
    ToolbarModule,
    DropDownButtonModule,
    UploaderModule,
    CircularGaugeModule,
    DropDownListAllModule,
    ListViewAllModule,
    DialogAllModule,
    TextBoxModule,
    RadioButtonModule,
    ComboBoxAllModule,
    SplitButtonModule,
    MultiSelectModule,
    NumericTextBoxModule,
    TreeViewModule,MatTooltipModule,
    DiagramModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true,
    },
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




