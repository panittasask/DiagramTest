import dataCustomer from './dataCustomer';
import {​​​​​​​​ getInstance }​​​​​​​​ from '@syncfusion/ej2-base';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import dataJsonUsing from './Chart.json';
import chart60node from './Chart60Node.json';
import orgUnit from './OrgUnit.json';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, OnInit, ChangeDetectorRef, } from '@angular/core';
import { Router } from 'express';
import {
  DiagramComponent,
  DiagramModule,
  LineDistribution,
  TreeInfo,
  PageSettingsModel,
  ScrollSettingsModel,
  PointModel,
  IFitOptions,
  DiagramAllModule
} from '@syncfusion/ej2-angular-diagrams';
import {
  NodeModel,
  ConnectorModel,
  DiagramTools,
  Diagram,
  DataBinding,
  ComplexHierarchicalTree,
  SnapConstraints,
  SnapSettingsModel,
  LayoutModel,
  ConnectionPointOrigin,
  OrthogonalSegmentModel,
  ChildArrangement,
  LineRouting,
  DiagramConstraints,
  PaletteModel,
  SymbolInfo,
  MarginModel,
  IDragEnterEventArgs,
  ConnectorConstraints,
  ConnectorEditing,
  StackPanel,
  Container,
  ImageElement,
  TextElement,
  IGraphObject,
  Rect,
  TextModel,
  NodeConstraints,
  Shadow,
  ShapeStyleModel,
  IExportOptions,
  getOppositeDirection,
  Layout,
  PrintAndExport,
  DiagramModel,
  ZoomOptions,
  Overview,
  HierarchicalTree,
  Shape,
  AnnotationConstraints,
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
// import * as Data from './diagram-data.json';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
// import { paletteIconClick } from './script/diagram-common';
import { ExpandMode } from '@syncfusion/ej2-navigations';

import ModelData from './MogData';
import { connect } from 'http2';
import { wrap } from 'module';
import { ControlPoints, CornerRadius, IExportEventArgs, colorNameToHex } from '@syncfusion/ej2-angular-charts';
import { content, setStyleAndAttributes } from '@syncfusion/ej2-angular-grids';
import Data from './dataObject';
import { response } from 'express';
import html2canvas from 'html2canvas';
import { HttpHeaders } from '@angular/common/http';
import { runInThisContext } from 'vm';
import { threadId } from 'worker_threads';
import { bottom, left, right } from '@popperjs/core';
import { NgxSpinner, NgxSpinnerService,NgxSpinnerModule } from 'ngx-spinner';
import { rejects } from 'assert';

Diagram.Inject(
  DataBinding,
  ComplexHierarchicalTree,
  LineRouting,
  LineDistribution,
  ConnectorEditing,
  HierarchicalTree,
);

export interface EmployeeInfo {
  Role: string;
  color: string;
  ImageUrl: string;
}
export interface DataInfo {
  [key: string]: string;
}

export interface MyObject {
  positionId: string; visible: boolean;
}

@Component({
  selector: 'app-customer-model',
  templateUrl: './customer-model.component.html',
  styleUrl: './customer-model.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CustomerModelComponent implements OnInit {
  @ViewChild('diagram')
  //@ViewChild('overview') el:ElementRef<HTMLImageElement>
  public diagram: DiagramComponent;
  constructor(private http:HttpClient,private cdr: ChangeDetectorRef,private spinner:NgxSpinnerService){}
  @ViewChild('overview') public overview:Overview;
  public connectors: ConnectorModel;
  public customerData: any = dataCustomer;
  public ModelData: any = Data;
  public objectItemAdd: object[];
  public visibleItem: MyObject[] = [];
  public largData:any = dataJsonUsing;
  public node60:any = chart60node;
  public orgunit:any = orgUnit;
  public isChild: boolean = false;
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  public levelSearch:any =[];
  public visible: boolean = false;
  public visibleObject: any;
  public options: IExportOptions;
  public objectData: object;
  public listLevel:number=2;
  public data: Object = {
    id: 'objectID',
    parentId: 'parentObjectID',
    // dataSource: new DataManager(this.orgunit),
    // dataSource:new DataManager(this.largData),
    dataSource:new DataManager(this.orgunit.data),
    doBinding: (nodeModel: NodeModel, item: any, diagram: Diagram) => {
      nodeModel.shape={
        type:'Basic'
      }
    }
  };
  public tool: DiagramTools = DiagramTools.ZoomPan;

  public layout: LayoutModel  = {
    // type: 'OrganizationalChart',
    type:'HierarchicalTree',
    connectionDirection:'Orientation',
    enableRouting:false,
    enableAnimation:false,
    // type:'HierarchicalTree',
    //margin: { left: 10, right: 10, top: 10, bottom: 0 },
    // margin:{ left: 100, top: 100, right: 100, bottom: 500 },
    verticalSpacing: 120,
    horizontalSpacing: 90,
    arrangement:ChildArrangement.Nonlinear,
    horizontalAlignment: "Left", verticalAlignment: "Top",
    //bounds:new Rect(0,0,400,600),
    connectionPointOrigin: ConnectionPointOrigin.SamePoint,
    // orientation:'TopToBottom',
    // enableAnimation: true,
    getLayoutInfo: (node: Node, options: TreeInfo) => {
      // options.enableRouting = true;
      if (!options.hasSubTree) {
        options.type = 'Right';
      }
    },
  };

  public nodeDefaults(obj: any): NodeModel {
    obj.constraints = NodeConstraints.Default & ~(  NodeConstraints.Inherit | NodeConstraints.Select);
    obj.shape = { type: 'HTML' };
    obj.style = { fill: 'white', strokeColor: 'black', color: 'black' ,CornerRadius:20};
    obj.width = 450;
    obj.height = 600;
    return obj;
  }
  public connDefaults(
    connector: any, diagram: Diagram): ConnectorModel {
    connector.targetDecorator.height = 20;
    connector.targetDecorator.width = 20;
    connector.type = 'Orthogonal';
    connector.constraints = ConnectorConstraints.ReadOnly | ConnectorConstraints.LineRouting;
    // connector.constraints = ConnectorConstraints.LineRouting;
    //connector.constraints = 0;
    connector.cornerRadius = 8;
    connector.style.fill = '#858383';
    connector.style.strokeColor = '#858383';
    connector.style = { strokeWidth: 2, opacity: 1 };
    connector.targetDecorator.shape = 'none';

    return connector;
  }

  public created(args:Object): void {
    // console.log("Diagram",this.diagram.nodes)
    this.spinner.show();
    let AllOffset = this.diagram.nodes.map((x:any)=>x.offsetY)
    let cd = this.findDuplicate(AllOffset);
    let arrObj:any=[];
    for(var i = 1 ;i < cd.length +1;i++){
      arrObj.push({value:i})
    }
    this.levelSearch=[...arrObj];
    for(var i=0;i<cd.length;i++)
    this.diagram.nodes.forEach((x:any)=>{
      if(cd[i] == x.offsetY){
        x.data.levelItem = i+1;
      }
    })
    this.diagram.nodes.forEach((x:any)=>{
      if(x.data.levelItem > 1){
         //x.isExpanded = false;
      }
      if(x.data.objectType == 'UnitCode'){
        x.height = 300;
      }
      this.SetDynamicNode();
      this.diagram.dataBind();
      this.diagram.doLayout();
    })


    if(this.diagram.nodes[0].wrapper != undefined){
      this.diagram.bringToCenter(this.diagram.nodes[0].wrapper.bounds);
    }
    this.spinner.hide();
    // this.diagram.dataBind();
  }

  public selectLevel(args:any){
    if(args != null){
      this.diagram.nodes.forEach((x:any)=>{
        if(x.data.levelItem >= args.value){
          if(x.isExpanded == true)
          x.isExpanded = false;
        }
      })
      // this.diagram.dataBind();
    }
  }

  public findDuplicate(data:any){
    let selectData: any = [];
    data.forEach((e:any) => {
      let check = selectData.some((x:any)=> x===e);
      if(!check){
        selectData.push(e)
      }
    });
    return selectData;
  }

  public countChild(){
    for(var i = 0;i < this.diagram.nodes.length;i++){
        let main:any = this.diagram.nodes[i];
        let child:any = this.diagram.nodes.filter((x:any)=>x.data.reportToPositionID == main.data.positionID);
        if(child.length > 0){
          main.data.child = child.length;
        }
    }
    // this.diagram.dataBind();
  }
  public toCenter(){
        let bound = new Rect(200, 400, 500, 400);
        this.diagram.bringIntoView(bound);
  }

  public ZoomOut(){
    let ZoomOptions:ZoomOptions={
      type:"ZoomOut",
      zoomFactor:0.1,
    }
    this.diagram.zoomTo(ZoomOptions)
  }
  public matchingNodes: any;
  public currentIndex: number;

  public search(input: any) {

    if (this.matchingNodes && this.matchingNodes.length > 0) {
      this.matchingNodes[this.currentIndex].style.strokeColor = 'black';
      this.matchingNodes[this.currentIndex].style.strokeWidth = 1;
    }
    const searchText = (document.getElementById('searchBox') as any).value
      .replace(/\s+/g, '')
      .toLowerCase();
    const searchWords = searchText.split(/\s+/);
    const searchRegex = new RegExp(
      searchWords.map((word: any) => `\\b${word}\\b`).join('.*'),
      'i'
    );
    this.matchingNodes = [];
    this.currentIndex = 0;
    this.diagram.clearSelection();

    if (searchText !== '') {
      this.matchingNodes = this.diagram.nodes.filter((node) => {
        if (
          searchRegex.test((node.data as any).Type.replace(/\s+/g, '').toLowerCase()) || (node.data as any).Type.toLowerCase().includes(searchText)
        ) {
          return true;
        } else {
          return false;
        }
      });
      if (this.matchingNodes && this.matchingNodes.length > 0) {
        this.diagram.select([this.matchingNodes[this.currentIndex]]);
      }
    } else {
      this.matchingNodes = [];
    }

  }

  public next() {
    if (this.matchingNodes && this.matchingNodes.length > 0) {
      this.diagram.clearSelection();
      this.currentIndex = (this.currentIndex + 1) % this.matchingNodes.length;
      this.diagram.select([this.matchingNodes[this.currentIndex]]);
      let bound = new Rect(200, 400, 500, 400);
      //this.diagram.bringIntoView(bound);
    }

  }
  public CheckValue(data:any){
    let Nodes:any = this.diagram.nodes.filter((x:any)=>x.id == data);
    return Nodes[0].isExpanded;
  }

  public Expand(node:any){
    let nodeData:any = this.diagram.nodes.filter((x:any)=> x.id == node);
    let condition = nodeData[0].isExpanded;
    if(nodeData.length > 0){
        nodeData[0].isExpanded = !condition;
    }

  }

  public previous() {
    if (this.matchingNodes && this.matchingNodes.length > 0) {
      this.diagram.clearSelection();
      this.currentIndex =
        (this.currentIndex - 1 + this.matchingNodes.length) %
        this.matchingNodes.length;
      this.diagram.select([this.matchingNodes[this.currentIndex]]);
      //let bound = new Rect(200, 400, 500, 400);
      //this.diagram.bringIntoView(bound);
    }
  }

  ngAfterViewInit() {
    this.spinner.hide();
  }
  ngAfterVIewChecked(){
    this.spinner.hide();
  }

  public OrgChart(){

  }
  public Export() {
    let options:IExportOptions={};
    options.mode='Download';
    this.diagram.exportDiagram(options);
  }


  public textTest:string= "";
  public ExportOptions(){
    //this.diagram.fitToPage();
    this.spinner.show();
    let stylesheet = document.styleSheets;
    let htmlData:string = this.diagram.getDiagramContent(stylesheet);
    const url = 'https://localhost:44301/home/generatedocument';
    const header = new HttpHeaders({
      'Content-type':'application/json'
    });
    const options = { headers :header};
    const requestData = JSON.stringify({options:htmlData});
    this.http.post(url,requestData,options).subscribe((result:any)=>{


      this.diagram.exportImage(result.result, {
        fileName: 'diagram',
        mode: 'Download',
        region: 'Content',
        stretch: 'Stretch',
      });
      // const source = result.result;
      // const download = document.createElement("a");
      // download.href = source;
      // download.download = 'Diagram.pdf';
      // download.click();

      this.spinner.hide();
      // this.diagram.exportImage(this.textTest, {
      //   fileName: 'diagram',
      //   mode: 'Download',
      // });
    },
    (error:any) =>{
      console.log("Error",error)
      this.spinner.hide();
    }
  );
  }
  public scrollSettings: ScrollSettingsModel = {scrollLimit:'Infinity',padding :{left:50,right:50,top:50,bottom:50}};
  public pageSettings:PageSettingsModel ={
    showPageBreaks:true,margin:{left:-100,right:-100,top:-100,bottom:-100}
  }
  ExpandAll(){
    this.spinner.show();
    this.diagram.nodes.forEach((x:any)=>{
      if(x.data.child > 0 && x.data.child != undefined && x.isExpanded == false)

        x.isExpanded = true;
    })
    this.spinner.hide();
    // this.diagram.dataBind();
    //this.spinner.hide();
  }
  async CollapsAll(){
    //this.diagram.nodes[0].isExpanded = false;
    this.spinner.show();
    let finish = false;
    await this.sendItemToCallaps(this.diagram.nodes)
    console.log("Nope It not")
    this.spinner.hide();
  }

  async sendItemToCallaps(item:any):Promise<void>{
    for(const data of item){
      data.isExpanded = false;
      this.diagram.dataBind();
      this.diagram.doLayout();
    }
    console.log("EndingAsync")

  }
  public CheckVisible(data:any){
    let findItem = this.isShow.filter((x:any)=>x.name.toUpperCase() == data.toUpperCase());
    let check = false;
    if(findItem.length > 0){
      check = findItem[0].visible
    }else{
      check = false;
    }
    return check;
  }
  ngOnInit(){
    this.spinner.show();
    for(var i = 0;i<this.orgunit.data.length;i++){
      let main:any = this.orgunit.data[i];
      let child:any = this.orgunit.data.filter((x:any)=> x.parentObjectID == main.objectID);
      if(child?.length > 0){
        main.child = child.length;
      }
    }
    this.isShow.forEach((x:any) =>{
      if(this.orgunit.isDisplayColumn.toUpperCase().split('|').includes(x.name.toUpperCase())){
        x.visible = true;
      }
    })
  }

  public isShow:any=[
    {
      name:'PersonNameDisplay',visible:false
    },
    {
      name:'PersonName2Display',visible:false
    },
    {
      name:'Empcode',visible:false
    },
    {
      name:'NickNameDisplay',visible:false
    },
    {
      name:'CompanyName',visible:false
    },
    {
      name:'OfficeName',visible:false
    },
    {
      name:'PositionName',visible:false
    },
    {
      name:'PersonnelGradeName',visible:false
    },
    {
      name:'HiredDateDisplay',visible:false
    },
    {
      name:'PositionLevelName',visible:false
    },
    {
      name:'JobFamilyName',visible:false
    },
    {
      name:'JobLevelName',visible:false
    },
    {
      name:'UnitCode',visible:false
    },
    {
      name:'MobileNumber2',visible:false
    },
    {
      name:'MobileNumber',visible:false
    },
    {
      name:'BirthDateDisplay',visible:false
    }
  ]

  public async SetDynamicNode(){
    var AllDisplay = this.isShow.filter((x:any) => x.visible == true);
    var Height = AllDisplay.length * 35;
    if(this.orgunit.boxHeight == null){
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.objectType != 'UnitCode'){
          if(r.data.replacementPersonID == null){
            r.height = Height;
            this.diagram.dataBind();
          }
          else{
            r.height = Height * 1.7;
            this.diagram.dataBind();
          }
        }
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.objectType != 'UnitCode'){
        if(r.data.replacementPersonID == null){
        r.height = this.orgunit.boxHeight;
        this.diagram.dataBind();
        }else{
          r.height = this.orgunit.boxHeight * 1.7;
          this.diagram.dataBind();
        }
      }
      })
    }
    if(this.orgunit.boxWidth == null){
      this.diagram.nodes.forEach((r:any) =>{
        r.width = 450;
        this.diagram.dataBind();
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        r.width = this.orgunit.boxWidth;
        this.diagram.dataBind();
      })
    }
    return Promise.resolve();
  }
}
