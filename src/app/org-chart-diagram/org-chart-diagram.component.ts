import dataCustomer from '../customer-model/dataCustomer';
import {​​​​​​​​ getInstance }​​​​​​​​ from '@syncfusion/ej2-base';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import dataJsonUsing from '../customer-model/Chart.json';
import chart60node from '../customer-model/Chart60Node.json';
import orgUnit from '..//customer-model/OrgUnit.json';
import orgChartData from '../../model/P_Tee3.json';


import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
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
  ConnectorBridgingService
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
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
// import * as Data from './diagram-data.json';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
// import { paletteIconClick } from './script/diagram-common';
import { ExpandMode } from '@syncfusion/ej2-navigations';

import ModelData from '..//customer-model/MogData';
import { connect } from 'http2';
import { wrap } from 'module';
import { ControlPoints, CornerRadius, IExportEventArgs, Margin, colorNameToHex } from '@syncfusion/ej2-angular-charts';
import { content, setStyleAndAttributes } from '@syncfusion/ej2-angular-grids';
import Data from '../customer-model/dataObject';
import { response } from 'express';
import html2canvas from 'html2canvas';
import { HttpHeaders } from '@angular/common/http';
import { runInThisContext } from 'vm';
import { threadId } from 'worker_threads';
import { bottom, left, right } from '@popperjs/core';
import { NgxSpinner, NgxSpinnerService,NgxSpinnerModule } from 'ngx-spinner';
import { FitOptions } from '@syncfusion/ej2-diagrams/src/diagram/diagram/page-settings';
import { parse } from 'path';
import { promiseHooks } from 'v8';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { notDeepStrictEqual } from 'assert';

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
  selector: 'app-org-chart-diagram',
  templateUrl: './org-chart-diagram.component.html',
  styleUrl: './org-chart-diagram.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrgChartDiagramComponent implements OnInit {
  @ViewChild('diagram')
  //@ViewChild('overview') el:ElementRef<HTMLImageElement>
  public diagram: DiagramComponent;
  @ViewChild('nodeItem',{static:true}) public nodeItem:any;
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
    constraints:  ~(SnapConstraints.ShowLines)
  };
  public levelSearch:any =[];
  public visible: boolean = false;
  public visibleObject: any;
  public options: IExportOptions;
  public objectData: object;
  public listLevel:number=2;
  public height:number = 500;
  public width:number = 450;
  public orgChartData:any=orgChartData;
  public titleName:any=orgChartData.titleName;
  public titleDesc:any=orgChartData.titleDesc;

  public data: Object = {
    id: 'positionID',
    parentId: 'reportToPositionID',
    dataSource:new DataManager(this.orgChartData.data),
    doBinding: (nodeModel: NodeModel, item: any, diagram: Diagram,options:TreeInfo) => {
    }
  };
  public addTitle(){
    let titleName = this.titleName;
    let titleDesc = this.titleDesc;
    let width:any = document.getElementById('diagram')?.offsetWidth;
    let hgeith:any = document.getElementById('diagram')?.offsetHeight;
    let offsetX = this.diagram.nodes[0].offsetX;
    let offsetOfDiagram = this.diagram;
    let widhtData:any =this.diagram.scrollSettings.viewPortWidth;
    console.log("height",width)
    let node:NodeModel = {
      offsetX:(widhtData)*10,
      offsetY:-500,
      id:'title',
      shape:{
        type:'HTML',
        content:`<div style="offset-position:top;padding-top:100px;padding-bottom: 10px;background-color: #8ACDD7;border-radius: 25px 25px 0 0;justify-content: center; height: 100%;width:100%;align-items: center;text-align: center;vertical-align: center;"><h2 style="color: white;font-size:100px;margin-top:100px">${titleName}</h2><h2 style="color: white;font-size:100px;margin-top:150px">${titleDesc}</h2></div>`
      },
      // constraints:NodeConstraints.AllowMovingOutsideLane & NodeConstraints.Default
    }
    this.diagram.add(node);
    // let bottomnode:NodeModel = {
    //   offsetX:(width*19)/2.2,
    //   offsetY:hgeith+5000,
    //   id:'bottomNode',
    //   shape:{type:'Basic',shape:'Rectangle'},
    //   style:{fill:'#8ACDD7'}
    // }
    // this.diagram.add(bottomnode);
    let nodetitle:any = this.diagram.nodes.find((x:any)=> x.id == 'title')
    // let width:any = document.getElementById('diagram')?.offsetWidth;
    nodetitle.width = width*20;
    nodetitle.height = 700;
    // this.diagramthing();
  }
  public scrollSettings: ScrollSettingsModel = {scrollLimit:'Diagram',padding :{left:50,right:50,top:50,bottom:50}};
  public pageSettings:PageSettingsModel ={
    showPageBreaks:true
  }
  public layout: LayoutModel  = {
    type:'HierarchicalTree',
    connectionDirection:'Auto',
    verticalSpacing: 120,
    enableRouting:true,
    enableAnimation:false,
    horizontalSpacing: 90,
    horizontalAlignment:'Stretch',
    verticalAlignment:'Stretch',
    connectionPointOrigin: ConnectionPointOrigin.SamePoint,
    getLayoutInfo: (node: Node, options: TreeInfo,) => {
      if (!options.hasSubTree) {
          options.type = 'Balanced';
          options.orientation = 'Horizontal';
      }
    },
  };

  public nodeDefaults(obj: any): NodeModel {
    // obj.constraints = NodeConstraints.Default & ~( NodeConstraints.Select) ;
    obj.shape = { type: 'HTML' };
    // obj.offsetX = 100;
    // obj.offsetY = 100;
    obj.height = 500;
    return obj;
  }
  public connDefaults(
    connector: any, diagram: Diagram): ConnectorModel {
      connector.targetDecorator.height = 20;
      connector.targetDecorator.width = 20;
      connector.targetDecorator.style.fill = 'red';
      connector.targetDecorator.style.strokeColor = 'red';
      connector.connectorSpacing = 30;
      connector.type = 'Orthogonal';
      connector.bridgeSpace = 100;
      connector.constraints = ConnectorConstraints.Default;
      connector.cornerRadius = 10;
      connector.style.fill = '#858383';
      connector.style.strokeColor = '#858383';
      var getSourceId:any = diagram.nodes.filter((x:any) => x.id == connector.targetID)
      if(getSourceId.length > 0){
        if(getSourceId[0].data.reportToType == "org_ReportToInDirect"){
          connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'2 4',};
        }else{
          connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
        }
      }else{
        connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
      }
      connector.targetDecorator.shape = 'none';
      return connector;
  }
  public cleanerAfterExport(){
    this.diagram.remove(this.diagram.nodes.find((x:any)=>x.id == 'title'))
    // this.diagram.remove(this.diagram.nodes.find((x:any)=>x.id == 'bottomNode'))
  }
  public created(args:Object): void {
    this.spinner.show();
    this.diagram.constraints = DiagramConstraints.Default & ~DiagramConstraints.PageEditable ;
    this.diagram.scrollSettings ={scrollLimit:'Infinity'};
    this.diagram.pageSettings = {showPageBreaks:true};
    this.diagram.tool = DiagramTools.ZoomPan;
    let AllOffset = this.diagram.nodes.map((x:any)=>x.offsetY)
    let offsetX = this.diagram.nodes.map((x:any)=>x.offsetX)
    let xcd = this.findDuplicate(offsetX);
    let cd = this.findDuplicate(AllOffset);
    let arrObj:any=[];
    for(let i = 1 ;i < cd.length +1;i++){
      arrObj.push({value:i})
    }
    this.levelSearch=[...arrObj];
    for(let i=0;i<cd.length;i++){
      this.diagram.nodes.forEach((x:any)=>{
        if(cd[i] == x.offsetY){
          x.data.levelItem = i+1;
        }
      })
    }
    xcd = xcd.sort();
    for(let i=0;i<xcd.length;i++){
        this.diagram.nodes.forEach((x:any)=>{
          if(xcd[i] == x.offsetX){
            x.data.sideItem = i+1;
          }
      })
    }


      this.SetDynamicNode();
        this.height = this.diagram.nodes[0].height ? this.diagram.nodes[0].height : 500;
        this.width = this.diagram.nodes[0].width ? this.diagram.nodes[0].width : 450;
      this.diagram.dataBind();
      // this.diagram.doLayout();
      if(this.diagram.nodes[0].wrapper != undefined){
        this.diagram.bringToCenter(this.diagram.nodes[0].wrapper.bounds);
      }
      this.spinner.hide();
    if(this.diagram.nodes[0].wrapper != undefined){
    }

    this.selectLevel({value:2});
    this.diagram.zoom(0.2);
    this.spinner.hide();
    this.diagram.dataBind();
    let sideLevelData = this.diagram.nodes.filter((x:any)=>x.id != 'title').sort((a:any,b:any) => a.data?.sideItem - b.data?.sideItem)
    let lastOffsetX = this.diagram.nodes[this.diagram.nodes.length - 1];
    this.lastOffsetX = lastOffsetX.offsetX;
    this.firstOffsetX = sideLevelData[0].offsetX;
    console.log("firstOffsetX",this.firstOffsetX)
    console.log("ViewPort",this.diagram.scrollSettings.viewPortWidth)
    this.cleanerAfterExport();
    this.addTitle();
  }

  onWheel(event:any){
    let Zoom:ZoomOptions;
    event.preventDefault();
    if(event.wheelDelta > 0){
      Zoom = { type:'ZoomIn',zoomFactor:0.1};
    }else{
      Zoom = { type:'ZoomOut',zoomFactor:0.1};
    }
    this.diagram.zoomTo(Zoom)
    this.diagram.dataBind();
  }

  public selectLevel(args:any){
    this.cleanerAfterExport();
    if(args != null){
      this.diagram.nodes.forEach((x:any)=>{

        if(x.data.levelItem < args.value){
          x.isExpanded = true;
        }else{
          x.isExpanded = false;
        }
        // this.diagram.dataBind();
      })
      // this.diagram.dataBind();
    }
    // this.diagramthing();
    this.addTitle();
  }
  public firstOffsetX:any;
  public lastOffsetX:any;
  public changeHeight(){
    this.spinner.show;
    this.diagram.nodes.forEach((x:any)=>{
      x.height = this.height;
      this.diagram.dataBind();
    })
    this.spinner.hide();
    // this.diagram.doLayout();
  }
  public changeWidth(){
    this.spinner.show;
    this.diagram.nodes.forEach((x:any) =>{
      x.width = this.width;
      this.diagram.dataBind();
    })
    this.spinner.hide();
    // this.diagram.doLayout();
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
    this.diagram.dataBind();
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
    // this.spinner.show();
    let nodeData:any = this.diagram.nodes.find((x:any)=> x.id == node);
    nodeData.isExpanded = !nodeData.isExpanded;

    if(nodeData.wrapper != undefined){
      this.diagram.bringToCenter(nodeData.wrapper.bounds);
    }
      this.spinner.hide();
      this.diagramthing()
    // this.diagram.refresh();
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


  public OrgChart(){

  }
  public diagramthing(){
    this.diagram.dataBind();
    // this.diagram.doLayout();
  }

  public ExportOptions(){
    this.spinner.show();
    // this.addTitle();
    let styleSheets = document.styleSheets;
    let htmlData:string = this.diagram.getDiagramContent(styleSheets);
    // this.diagram.remove(this.diagram.nodes.find((x:any)=> x.id == 'title'))
    // this.diagram.remove(this.diagram.nodes.find((x:any)=> x.id == 'bottomNode'))
    const url = 'https://localhost:44301/home/generatedocument';
    const header = new HttpHeaders({
      'Content-type':'application/json'
    });
    let dtName = new Date();
    const options = { headers :header};
    const requestData = JSON.stringify({options:htmlData});
    this.http.post(url,requestData,options).subscribe((result:any)=>{

      this.diagram.exportImage(result.result, {
        fileName: 'diagram'+dtName.toString(),
        // margin : { left: 100, right: 100, top: 100, bottom: 100 },
        mode: 'Download',
        region: 'Content',
        pageHeight:5000,
        stretch: 'None',
        format:'PNG',
      });
      // this.cleanerAfterExport();
      // this.diagram.remove(this.diagram.nodes.find((x:any)=> x.id == 'title'))
      this.diagramthing();
      this.spinner.hide();
    }
  );
  }

  ExpandAll(){
    this.spinner.show();
  //   (async() =>{
  //   for await(let item of this.diagram.nodes){
  //     item.isExpanded = true;
  //     await this.sleep(10);
  //   }
  //   this.diagram.dataBind();
  //   this.diagram.doLayout();
  //   if(this.diagram.nodes[0].wrapper != undefined){
  //     this.diagram.bringToCenter(this.diagram.nodes[0].wrapper.bounds);
  //   }
  //   this.spinner.hide();
  // })();

  this.diagram.nodes.forEach((x:any)=>{
    if(x.isExpanded == false){
      x.isExpanded = true;
      this.diagram.dataBind();
      // this.diagram.doLayout();
    }
  });
  this.spinner.hide();

  }
  CollapsAll(){
    this.spinner.show();
    this.diagram.nodes.forEach((x:any)=>{
      if(x.isExpanded == true){
        x.isExpanded = false;
        this.diagram.dataBind();
        // this.diagram.doLayout();
      }
    })
    this.spinner.hide();
  }


  async sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve,ms));
   }
  ngOnInit(){
    this.spinner.show();
    this.isShow.forEach((x:any) =>{
      if(this.orgChartData.isDisplayColumn.toUpperCase().split('|').includes(x.name.toUpperCase())){
        x.visible = true;
      }
    })

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
  public async SetDynamicNode(){
    var AllDisplay = this.isShow.filter((x:any) => x.visible == true);
    var Height = AllDisplay.length * 35;
    if(this.orgChartData.boxHeight == null){
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data?.replacementPersonID == null){
          r.height = Height;
          this.diagram.dataBind();
        }
        else{
          r.height = Height * 1.7;
          this.diagram.dataBind();
        }
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.replacementPersonID == null){
        r.height = this.orgChartData.boxHeight;
        this.diagram.dataBind();
        }else{
          r.height = this.orgChartData.boxHeight * 1.7;
          this.diagram.dataBind();
        }
      })
    }
    if(this.orgChartData.boxWidth == null){
      this.diagram.nodes.forEach((r:any) =>{
        r.width = 450;
        this.diagram.dataBind();
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        r.width = this.orgChartData.boxWidth;
        this.diagram.dataBind();
      })
    }
    // this.diagram.doLayout();
    return Promise.resolve();
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
}
