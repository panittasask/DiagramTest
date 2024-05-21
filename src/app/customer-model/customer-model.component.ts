import dataCustomer from './dataCustomer';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';

import { DiagramService } from '../services/diagram.service';
import {
  DiagramComponent,
  LineDistribution,
  TreeInfo,
  ScrollSettingsModel,
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
  LineRouting,
  ConnectorEditing,
  Rect,
  IExportOptions,
  ZoomOptions,
  Overview,
  HierarchicalTree,
} from '@syncfusion/ej2-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';

import Data from './dataObject';
import { HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebserviceService } from '../services/webservice.service';
import { AppComponent } from '../app.component';

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
  @ViewChild('diagram',{static:true})
  public diagram: DiagramComponent;
  @ViewChild('nodeTemplate',{static:false,read:ElementRef}) public nodeTemplate:ElementRef;
  constructor(private App:AppComponent,private http:HttpClient,private cdr: ChangeDetectorRef,private spinner:NgxSpinnerService,private service:DiagramService,private WebService:WebserviceService){}
  @ViewChild('overview') public overview:Overview;
  @ViewChild('topmenu') public topmenu:any;
  public connectors: ConnectorModel;
  public customerData: any = dataCustomer;
  public ModelData: any = Data;
  public objectItemAdd: object[];
  public visibleItem: MyObject[] = [];
  public orgunit:any = [];
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
  public titleName:any;
  public titleDesc:any;
  public CheckExpandStatus:{[key:string]:boolean}={};
  public inDirect:boolean = false;
  public matrixposition:boolean =false;
  public ShowField:{[key:string]:boolean}={};
  public Caption:any={
    n0:"",
    n1:"",
    n2:"",
    n3:"",
  }



  public data: Object = {

  };
  public tool: DiagramTools = DiagramTools.ZoomPan;

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

  public nodeDefaults(obj: any): NodeModel {
    // obj.constraints = NodeConstraints.Default & ~(  NodeConstraints.Inherit | NodeConstraints.Select);
    // obj.constraints = NodeConstraints.InConnect;
    obj.shape = { type: 'HTML' };
    obj.width = 500;
    obj.height = 600;
    return obj;
  }
  public connDefaults(
    connector: any, diagram: Diagram): ConnectorModel {
    // connector.targetDecorator.height = 120;
    // connector.targetDecorator.width = 120;
    connector.type = 'Orthogonal';
    // connector.constraints = ConnectorConstraints.ReadOnly | ConnectorConstraints.LineRouting;
    // connector.constraints = ConnectorConstraints.LineRouting;
    //connector.constraints = 0;
    connector.cornerRadius = 8;
    connector.style.fill = '#858383';
    connector.style.strokeColor = '#858383';
    connector.style = { strokeWidth: 2, opacity: 1 };
    connector.targetDecorator.shape = 'none';
    connector.targetDecorator.height = 0;
    connector.targetDecorator.width = 0;
    let getSourceId:any = diagram.nodes.filter((x:any) => x.id == connector.targetID)
    if(getSourceId.length > 0){
      let upper = 'org_ReportToIndirect';
      if(getSourceId[0].data.reportToType?.toUpperCase() == upper.toUpperCase()){
        connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'5,5',};
      }else{
        connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
      }
    }else{
      connector.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
    }
    return connector;
  }
  public created(): void {
    this.spinner.show();

    setTimeout(()=>{
      for(const item of this.diagram.nodes){
        this.updateCheckValue(item.id)
      }
      let AllOffset = this.diagram.nodes.map((x:any)=>x.offsetY)
      let cd = this.findDuplicate(AllOffset);
      let arrObj:any=[];
      for(let i = 1 ;i < cd.length +1;i++){
        arrObj.push({value:i})
      }
      this.levelSearch=[...arrObj];
      for(let i=0;i<cd.length;i++)
      this.diagram.nodes.forEach((x:any)=>{
        if(cd[i] == x.offsetY){
          x.data.levelItem = i+1;
        }
      })
      this.SetDynamicNode();
      this.diagram.nodes.forEach((x:any)=>{
        // if(x.data.levelItem > 1){
              //x.isExpanded = false;
        // }
        if(x.data.objectType == 'UnitCode'){
          x.height = 200;
        }

      })

      this.diagram.dataBind();
      this.topmenu.DiagramLevel = this.levelSearch;
      this.selectLevel({value:2})
    },3000);
  }

  addTitle(){
    let titleName = this.titleName;
    let titleDesc = this.titleDesc;
    let node:NodeModel = {
      id:'title',
      offsetX:0,
      offsetY:-1500,
      style:{
        fill:'black',
        strokeColor:'green',
      },
      shape:{
        type:'HTML',
        content:`<div style="padding-bottom: 10px;background-color: #8ACDD7;border-radius: 25px 25px 0 0;justify-content: center; height: 100%;width:100%;align-items: center;text-align: center;vertical-align: center;"><h2 style="color: white;font-size:100px;margin-top:100px">${titleName}</h2><h2 style="color: white;font-size:100px;margin-top:150px">${titleDesc}</h2></div>`
      }
    }
    this.diagram.add(node);
    let nodetitle:any = this.diagram.nodes.find((x:any)=> x.id == 'title')
    let width:any = document.getElementById('diagram')?.offsetWidth;
    nodetitle.width = width*17;
    nodetitle.height = 700;
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
    this.diagram.fitToPage();
    this.diagram.dataBind();
  }

  public selectLevel(args:any){
    this.spinner.show()
    setTimeout(() =>{
    if(args != null){
      this.diagram.nodes.forEach((x:any)=>{

        if(x.data.levelItem < args.value){
          x.isExpanded = true;
          this.CheckExpandStatus[x.id] = true;
        }else{
          x.isExpanded = false;
          this.CheckExpandStatus[x.id] = false;
        }

        this.diagram.dataBind();
      })
    }
    this.spinner.hide();
    },1000)

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
    }

  }
  public updateCheckValue(id:any){
    this.CheckExpandStatus[id] = this.CheckValue(id);
  }

  public CheckValue(data:any){
    let Nodes:any = this.diagram.nodes.filter((x:any)=>x.id == data);
    return Nodes[0].isExpanded;
  }

  public previous() {
    if (this.matchingNodes && this.matchingNodes.length > 0) {
      this.diagram.clearSelection();
      this.currentIndex =
        (this.currentIndex - 1 + this.matchingNodes.length) %
        this.matchingNodes.length;
      this.diagram.select([this.matchingNodes[this.currentIndex]]);
    }
  }

public FitJINGJING(){
  this.diagram.fitToPage();

}
public diagramthing(){
  this.diagram.dataBind();
  this.diagram.doLayout();
}
  public ExportOptions(){

    this.spinner.show();
    // this.addTitle();
    let stylesheet = document.styleSheets;
    let htmlData = this.diagram.getDiagramContent();
    const url = 'https://localhost:44301/home/generatedocument';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    const requestData = JSON.stringify({ Options: htmlData });

    this.http.post(url, requestData, options).subscribe((result:any)=>{
    var base64Data = result.result;


      var img = new Image();
      img.src = base64Data;


      img.onload = () => {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx:any = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0,  canvas.width ,  canvas.height);

        var modifiedBase64Data = canvas.toDataURL('image/png');

        var link = document.createElement('a');
        link.download = 'DataDownload.png';
        link.href = modifiedBase64Data;

        link.click();

    this.spinner.hide();
    }
    }
  );
  }
  public scrollSettings: ScrollSettingsModel = {scrollLimit:'Infinity',padding:{top:100,bottom:100,left:100,right:100}};
  // public pageSettings:PageSettingsModel ={
  //   showPageBreaks:true,margin:{top:100,left:100,right:100,bottom:-1500}
  // }
  ExpandAll(){
    this.spinner.show();
    setTimeout(() =>{
      this.diagram.nodes.forEach((x:any)=>{
          x.isExpanded = true;
          this.CheckExpandStatus[x.id] = true;
      })
      let levelSearch:any = this.levelSearch.length;
      this.listLevel = levelSearch;
      this.spinner.hide();
    },500)
    // this.diagram.dataBind();
    //this.spinner.hide();
  }
  async CollapsAll(){
    //this.diagram.nodes[0].isExpanded = false;
    this.spinner.show();
    setTimeout(() => {
      this.sendItemToCallaps(this.diagram.nodes)
      let levelSearch:any = this.levelSearch[0];
      this.listLevel = levelSearch.value;
    }, 500);



  }

  async sendItemToCallaps(item:any):Promise<void>{
    for(const data of item){
      data.isExpanded = false;
      this.CheckExpandStatus[data.id] = false;
      this.diagram.dataBind();
    }
    this.spinner.hide();
  }
  public Expand(node:any){
    let nodeData:any = this.diagram.nodes.find((x:any)=> x.id == node);
    this.spinner.show();
    nodeData.isExpanded = !nodeData.isExpanded;
    this.CheckExpandStatus[node] = nodeData.isExpanded;
    this.spinner.hide();

  }
  ngOnInit(){
    this.spinner.show();
    this.WebService.decodeUrl().then(response =>{
      if(response){
        this.service.getOrganizationUnitAndPositionChart().subscribe({
          next:(result:any)=>{
            this.orgunit = result;
            this.titleName = result.titleName;
            this.titleDesc = result.titleDesc;
            this.orgunit.data.forEach((x:any)=>{
              let child = this.orgunit.data.filter((e:any)=> e.parentObjectID == x.objectID)
              x.totalImmSub = child.length ? child.length : 0;
            })

            this.orgunit.isDisplayColumn.toUpperCase().split('|').forEach((x:any)=>{
              this.ShowField[x] = true;
            })
            this.Caption.n0 = this.orgunit.n0Caption;
            this.Caption.n1 = this.orgunit.n1Caption;
            this.Caption.n2 = this.orgunit.n2Caption;
            this.Caption.n3 = this.orgunit.n3Caption;

            let type = 'org_ReportToInDirect';
            let mat = 'MatrixPos';
            let inDirect = this.orgunit.data.filter((x:any)=>x.reportToType?.toUpperCase() ==type.toUpperCase());
            if(inDirect.length > 0)
              this.inDirect = true;
            let matrix = this.orgunit.data.filter((x:any)=>x.objectType?.toUpperCase() == mat.toUpperCase());
            if(matrix.length > 0)
              this.matrixposition = true;

            this.data = {
              id: 'objectID',
              parentId: 'parentObjectID',
              dataSource:new DataManager(this.orgunit.data),
              doBinding: (nodeModel: NodeModel, item: any, diagram: Diagram) => {
                nodeModel.shape={
                  type:'Basic'
                }
              }
            }

            this.topmenu.levelSearch = this.App.setRouting();
          },
          error:(err)=>{
            console.log("Error >>>",err)
          }
        })
      }
    })
  }


  public async SetDynamicNode(){
    let Height = Object.keys(this.ShowField).length * 40;
    if(this.orgunit.boxHeight == null){
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.objectType != 'UnitCode'){
          if(r.data.replacementPersonID == null){
            r.height = Height;
            this.diagram.dataBind();
          }
          else{
            r.height = Height * 1.8;
            this.diagram.dataBind();
          }
        }else if(r.data.objectType == 'UnitCode'){
          r.height = 200;
        }
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.objectType != 'UnitCode'){
        if(r.data.replacementPersonID == null){
        r.height = this.orgunit.boxHeight;
        this.diagram.dataBind();
        }else{
          r.height = this.orgunit.boxHeight * 1.8;
          this.diagram.dataBind();
        }
      }
      else if(r.data.objectType == 'UnitCode'){
        r.height = 200;
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
