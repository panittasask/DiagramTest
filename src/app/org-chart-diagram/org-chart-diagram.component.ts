import dataCustomer from '../customer-model/dataCustomer';
import {​​​​​​​​ getInstance }​​​​​​​​ from '@syncfusion/ej2-base';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import dataJsonUsing from '../customer-model/Chart.json';
import chart60node from '../customer-model/Chart60Node.json';
import orgUnit from '..//customer-model/OrgUnit.json';
import orgChartData from '../../model/Chart/OrgPosition.json';
import { CheckValuePipe } from '../components/check-value.pipe';
import { DiagramService } from '../services/diagram.service';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, ViewEncapsulation, ViewChild, ElementRef, ViewChildren, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ɵɵtrustConstantResourceUrl, model, } from '@angular/core';

import {
  DiagramComponent,
  DiagramModule,
  LineDistribution,
  TreeInfo,
  PageSettingsModel,
  ScrollSettingsModel,
  PointModel,
  IFitOptions,
  ConnectorBridgingService,
  OverviewComponent
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
  RulerSettingsModel,
  BpmnDiagrams,
  UndoRedo,
  TextStyleModel,
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
import { RulerSettings } from '@syncfusion/ej2-diagrams/src/diagram/diagram/ruler-settings';
import { addObjectToGrid } from '@syncfusion/ej2-diagrams/src/diagram/utility/swim-lane-util';
import { ConnectableObservable, tap } from 'rxjs';
import { debug, error } from 'console';
import { request } from 'http';
import { btoa } from 'buffer';
import { Buffer } from 'buffer';
import { WebserviceService } from '../services/webservice.service';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { title } from 'process';
import { consumerPollProducersForChange, setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
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
export class OrgChartDiagramComponent implements OnInit{
  @ViewChild('spinner',{static:true}) public spinner:any;
  @ViewChild('diagram')
  public diagram: DiagramComponent;
  @ViewChild('topmenu',{static:true}) public topmenu:any;
  @ViewChild('overview',{static:true}) public overview:OverviewComponent;
  public loading:string='Loading...';
  constructor(private router:ActivatedRoute,private AppComp:AppComponent,private http:HttpClient,private cdr: ChangeDetectorRef,private diagramService:DiagramService,private webService:WebserviceService){

    this.vm = this;
  }
  public FirstLoad:boolean=true;
  public connectors: ConnectorModel;
  public customerData: any = dataCustomer;
  public ModelData: any = Data;
  public objectItemAdd: object[];
  public visibleItem: MyObject[] = [];
  public largData:any = dataJsonUsing;
  public node60:any = chart60node;
  public orgunit:any = orgUnit;
  public isChild: boolean = false;
  public levelSearch:any =[];
  public visible: boolean = false;
  public visibleObject: any;
  public options: IExportOptions;
  public objectData: object;
  public listLevel:number=2;
  public height:number = 500;
  public width:number = 450;
  public wspaceing:number = 0;
  public hspaceing:number = 0;
  public orgChartData:any=[];
  public titleName:any=orgChartData.titleName;
  public titleDesc:any=orgChartData.titleDesc;
  public ExpandStatus:{[key:string]:boolean}={};
  public inDirect:boolean = false;
  public matrixposition:boolean =false;
  public vm:any;
  public ShowField:{[key:string]:boolean}={};
  public Caption:any={
    n0:"",
    n1:"",
    n2:"",
    n3:"",
  }
  public exCodeTest:any="cmVwb3J0dHlwZT1wb3NpdGlvbmNoYXJ0JnBvc2l0aW9uaWQ9OTI0MjI5YjMtNTdkNC00MzZjLWFhZWMtOWFjNGM1ZWUxYTIxJmVmZmRhdGU9MTcgTWF5IDIwMjQXEQPSX&R=97623";
  public data: Object = {

  };
  public tool: DiagramTools = DiagramTools.ZoomPan;
public snapSettings: SnapSettingsModel = { constraints:SnapConstraints.None };
public scrollSettings: ScrollSettingsModel = { scrollLimit: 'Infinity',
padding:{left:100,right:100,top:100,bottom:100} };


  public layout: LayoutModel  = {
    type:'HierarchicalTree',
    connectionDirection:'Auto',
    enableRouting:true,
    enableAnimation:true,
    verticalSpacing: 120,
    horizontalSpacing: 90,
    connectionPointOrigin: ConnectionPointOrigin.SamePoint,
    getLayoutInfo: (node: Node, options: TreeInfo) => {
      if (!options.hasSubTree) {
        options.orientation = 'Vertical';
        options.type = 'Right';
      }
    },
  };
  public nodes :NodeModel[] = [
    {
      id:'title',
      offsetX:600,
      offsetY:-400,
      annotations:[{
        content:`${this.titleName} ${this.titleDesc}`,
        style:{strokeColor:'none',color:'black',fontSize:90,textWrapping:'NoWrap'}
      }],
      excludeFromLayout:true,
      height:200,
      width:200,
      constraints:  ~NodeConstraints.Shadow,
      style:{ fill: 'white', strokeColor: 'none', color: 'white' },
      visible:false,
    },
    // {
    //   id:'descritpion',
    //   shape:{type:'HTML',content:
    //   `<div style="padding-right: 20px;position: relative;width: 100%;height: 50px;background-color: transparent;display: flex;justify-content: flex-end;gap: 20px;align-items: center;">
    //   <div [style.background]="'#7286D3'" style="background:#7286D3" class="circle"></div>
    //   <div class="text">ตำแหน่งหลัก</div>
    //   <div [style.background]="'#B9F3FC'" style="background:#B9F3FC" class="circle"></div>
    //   <div class="text">ตำแหน่งรอง</div>
    //   <div [style.background]="'#F6995C'" style="background:#F6995C" class="circle"></div>
    //   <div class="text">รักษาการ</div>
    //   <div class="rectangletooltip"></div>
    //   <div class="text">Matrix Position</div>
    //   <hr class="linetooltip">
    //   <div class="text">Report to Indirect</div>
    // </div>`},
    //   offsetX:150,
    //   offsetY:-100,
    //   excludeFromLayout:true,
    //   height:200,
    //   width:1000,
    // }
  ]

  public nodeDefaults(obj: any,diagram:DiagramComponent): any {
    // obj.constraints = ~(NodeConstraints.AllowMovingOutsideLane);


    if(obj.id == 'title'){
         obj.height = 600;
        obj.shape = { type: 'text' }
    }else{
        obj.height = 600;
        obj.shape = {type :'HTML'}
    }

    // else if(obj.id == 'descritpion'){
    //   obj.height = 200;
    //   obj.style = { fill: 'white', strokeColor: 'none', color: 'white' };
    // }
    // else{


      obj.width = 600;
    // }

    return obj;
  }
  public connDefaults(
    connector: any, diagram: Diagram): ConnectorModel {
      connector.connectorSpacing = 200;
      connector.type = 'Orthogonal';
      connector.bridgeSpace = 200;
      connector.cornerRadius = 8;
      connector.style.fill = '#858383';
      connector.style.strokeColor = '#858383';
      let getSourceId:any = diagram.nodes.filter((x:any) => x.id == connector.targetID)
      if(getSourceId.length > 0){
        if(getSourceId[0].data.reportToType == "org_ReportToInDirect"){
          connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'5,5',};
        }else{
          connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
        }
      }else{
        connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
      }
      connector.targetDecorator.shape = 'none';
      return connector;
  }

  public created(args:Object): void {
    try{
    this.spinner.show();
    setTimeout(()=>{
      let filternode = this.diagram.nodes.filter((x:any)=>x.id !='title' && x.id !='descritpion').map((x:any)=>x.offsetY)
      let AllOffset = [...filternode]
      let cd = this.findDuplicate(AllOffset);
      let arrObj:any=[];
      for(let i = 1 ;i < cd.length +1;i++){
        arrObj.push({value:i})
      }
      this.levelSearch=[...arrObj];
      for(let i=0;i<cd.length;i++){
        this.diagram.nodes.forEach((x:any)=>{
          if(x.id != 'title' && x.id !='descritpion'){
            if(cd[i] == x.offsetY){
              x.data.levelItem = i+1;
            }
          }

        })
      }

      this.topmenu.DiagramLevel = this.levelSearch;
      this.topmenu.listLevel = this.levelSearch.length;
      this.selectLevel({value:this.levelSearch.length});

      this.diagram.height = window.innerHeight-120;
      this.diagram.dataBind();
      let nodeTitle = this.nodes[0];
      nodeTitle.offsetX = this.diagram.scrollSettings.viewPortWidth ? this.diagram.scrollSettings.viewPortWidth / 2 : window.innerWidth/2;
      this.diagram.add(nodeTitle);
      this.SetDynamicNode().then(response =>{
        if(response){
          this.CenterNode();
        }
      });
      setTimeout(() => {
        this.FirstLoad = false;
        this.spinner.hide();
      }, 3000);



    },2000)

    }catch(err){
      console.log("Error",err)
    }

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

  public ChangeMatrix(martrixId:string){
    if(this.FirstLoad==false)
    this.spinner.show();

    setTimeout(() => {
      this.diagramService.loadDataWithMatrix(martrixId).subscribe({
      next:(result:any)=>{
        this.diagram.dataSourceSettings.dataSource = new DataManager(result.data)
        // this.data = result.data;
        // this.diagram.dataBind();
        // this.diagram.updateData();
        this.diagram.refresh();

        // this.diagram.clear();
        // this.diagram.refresh();
        this.created(Object);


      }
    });
    }, 500);

  }

  public selectLevel(args:any){
    if(this.FirstLoad == false){
      this.spinner.show();
    }


    setTimeout(()=>{
      if(args != null){
        this.diagram.nodes.forEach((x:any)=>{
          if(x.id != 'title' && x.id != 'descritpion'){
            if(x.data.levelItem < args.value){
              this.ExpandStatus[x.id]=x.isExpanded;
              x.isExpanded = true;
            }else{
              this.ExpandStatus[x.id]=x.isExpanded;
              x.isExpanded = false;
            }
          }
            this.diagram.dataBind();
        })
      }
      this.CenterNode();
      if(this.FirstLoad ==false){
        this.spinner.hide();
      }
    },0)
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



  public Expand(node:any){
    this.spinner.show();
    let nodeData:any = this.diagram.nodes.find((x:any)=> x.id == node);
    nodeData.isExpanded = !nodeData.isExpanded;
    this.ExpandStatus[node] = nodeData.isExpanded;
    this.diagram.dataBind();
    this.spinner.hide();

  }

  public CenterNode(){
    let nodePosition:any = this.diagram.nodes.filter((x:any)=>x.id != 'title');
    this.diagram.bringToCenter(nodePosition[0] ? nodePosition[0].wrapper.bounds : new Rect(0,0));
  }

  showTitleNode(){
    let titlenode:any =this.diagram.nodes.find((x:any)=> x.id == 'title')
    titlenode.visible = true;
    titlenode.width = this.diagram.scrollSettings.viewPortWidth ? this.diagram.scrollSettings.viewPortWidth * 2 : titlenode.width * 2;
  }
  hideTitleNode(){
    let titlenode:any =this.diagram.nodes.find((x:any)=> x.id == 'title')
    titlenode.visible = false;
  }
   ExportOptions(){
    this.spinner.show('Export in progress...');
    this.showTitleNode();
    let css = document.styleSheets;
    let diagramData = this.diagram.getDiagramContent(css);
    this.hideTitleNode();
       this.diagramService.ExportDiagram(diagramData).subscribe({
                next:(result:any)=>{
                  let base64Data = result.result;
                  let img = new Image();
                  img.src = base64Data;
                  img.onload = ()=>{
                    let canvas = document.createElement('canvas');
                    let ctx:any = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img,0,0,canvas.width,canvas.height);
                    let modifiedBase64Data = canvas.toDataURL('image/png');
                    let link = document.createElement('a');
                    link.download = 'DataDownload.png';
                    link.href = modifiedBase64Data;
                    link.click();

                  }
                },
                error:(err:any)=>{
                  console.log("Error>",err)
                  this.spinner.hide();
                },
                complete:()=>{
                  this.spinner.hide();

                }
              })

  }
  // public ExportOptions(){
  //   this.spinner.show();
  //   // this.addTitle();
  //   // let titleNode:any = this.diagram.nodes.find((x:any)=>x.id == 'title')
  //   // let tooltopnode:any = this.diagram.nodes.find((x:any)=>x.id == 'descritpion')
  //   // tooltopnode.visible = true;
  //   // titleNode.visible = true;
  //   let stylesheet = document.styleSheets;
  //   let htmlData = this.diagram.getDiagramContent();
  //   const url = 'https://localhost:44301/home/generatedocument';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   const options = { headers: headers };
  //   const requestData = JSON.stringify({ Options: htmlData });
  //   // titleNode.visible = false;
  //   // tooltopnode.visible = false;

  //   this.http.post(url,requestData,options).subscribe({
  //     next:(result:any)=>{
  //       var base64Data = result;

  //       var img = new Image();
  //       img.src = base64Data;


  //       img.onload = () => {
  //         // Create a canvas element
  //         var canvas = document.createElement('canvas');
  //         var ctx:any = canvas.getContext('2d');

  //       canvas.width = img.width;
  //       canvas.height = img.height;

  //       ctx.drawImage(img, 0, 0,  canvas.width ,  canvas.height);

  //         var modifiedBase64Data = canvas.toDataURL('image/png');

  //         var link = document.createElement('a');
  //         link.download = 'DataDownload.png';
  //         link.href = modifiedBase64Data;

  //         link.click();

  //     this.spinner.hide();
  //     }
  //   },
  //     error:(err)=>{
  //       console.log("Error>>",err.message)
  //       // alert(err.message);
  //       this.spinner.hide();
  //     },
  //     complete:()=>{
  //       this.spinner.hide();
  //     }
  //   })

  // }

  ExpandAll(){
    this.spinner.show();
    setTimeout(()=>{
      this.diagram.nodes.filter((x:any)=>x.id != 'title' && x.id != 'descritpion').forEach((x:any)=>{
        if(x.isExpanded == false){
          x.isExpanded = true;
          this.diagram.dataBind();
          // this.diagram.doLayout();
        }
        this.ExpandStatus[x.id]=x.isExpanded;
      });
      this.listLevel = this.levelSearch[this.levelSearch.length-1].value;
      this.spinner.hide();
      this.CenterNode();
    },500)
  }


  CollapsAll(){
    this.spinner.show();
    setTimeout(()=>{
      this.diagram.nodes.filter((x:any)=>x.id != 'title' && x.id != 'descritpion').forEach((x:any)=>{
        if(x.isExpanded == true){
          x.isExpanded = false;
          this.diagram.dataBind();
        }
        this.ExpandStatus[x.id] = x.isExpanded;
      })
      this.listLevel = this.levelSearch[0].value;
      this.spinner.hide();
      this.CenterNode();
    },500)
  }


  async ngOnInit(){
    this.spinner.show();
    let setSeatch = await this.webService.setMatrixView();
    this.topmenu.setMatrixSearch(setSeatch);
    await this.diagramService.setMatrixGroupId();
    this.webService.decodeUrl().then(response =>{
    if(response){
    this.diagramService.getPositionChart().subscribe({
      // this.diagramService.getOrganizationUnitAndPositionChart().subscribe({
      next:(result:any)=>{
        let matrixDropdown=[];
        matrixDropdown.push({'itemID':"All",'itemName':'All'})
        result.enumMatrixPositionGroup?.forEach((x:any)=>{
          matrixDropdown.push(x)
        })

        this.orgChartData = result;
        this.orgChartData.isDisplayColumn.toUpperCase().split('|').forEach((x:any)=>{
          this.ShowField[x] = true;
        })
        this.Caption.n0 = this.orgChartData.n0Caption;
        this.Caption.n1 = this.orgChartData.n1Caption;
        this.Caption.n2 = this.orgChartData.n2Caption;
        this.Caption.n3 = this.orgChartData.n3Caption;
        let type = 'org_ReportToInDirect';
        let mat = 'MatrixPos';
        let inDirect = this.orgChartData.data.filter((x:any)=>x.reportToType.toUpperCase() ==type.toUpperCase());
        if(inDirect.length > 0)
          this.inDirect = true;
        let matrix = this.orgChartData.data.filter((x:any)=>x.objectType?.toUpperCase() == mat.toUpperCase());
        if(matrix.length > 0)
          this.matrixposition = true;
        this.data = {
          id: 'positionID',
          parentId: 'reportToPositionID',
          dataSource:new DataManager(this.orgChartData.data),
          doBinding: (nodeModel: NodeModel, item: any, diagram: Diagram,options:TreeInfo) => {
          }
        }
        this.topmenu.MatrixSearch = matrixDropdown
        this.topmenu.levelSearch = this.AppComp.setRouting();
      },
      error:(err:any)=>{
        console.log("Error >>>",err)
      },
      complete:()=>{

      }
    })
      }

    });

  }

  public SetDynamicNode(){
    return new Promise((resolve,reject) =>{
    let Height = Object.keys(this.ShowField).length * 35;
    if(this.orgChartData.boxHeight == null){
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data?.replacementPersonID == null){
          r.height = Height;
        }
        else{
          r.height = Height * 2;
        }
      })

    }else{
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data?.replacementPersonID == null){
        r.height = this.orgChartData.boxHeight;
        }else{
          r.height = this.orgChartData.boxHeight * 2;
        }
      })
    }
    if(this.orgChartData.boxWidth == null){
      this.diagram.nodes.forEach((r:any) =>{
        r.width = 450;
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        r.width = this.orgChartData.boxWidth;
      })
    }
    setTimeout(() => {
      resolve(true);
    }, 2000);
    })
  }
}
