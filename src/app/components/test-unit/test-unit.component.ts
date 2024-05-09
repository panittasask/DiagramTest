
import dataCustomer from '../../customer-model/dataCustomer';
import {​​​​​​​​ getInstance }​​​​​​​​ from '@syncfusion/ej2-base';
import jsPDF from 'jspdf';
import dataJsonUsing from '../../customer-model/Chart.json';
import chart60node from '../../customer-model/Chart60Node.json';
import orgUnit from '../../customer-model/OrgUnit.json';
import orgChartData from '../../../model/Chart/OrgPosition.json';
import { ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { DataManager } from '@syncfusion/ej2-data';
import { AnnotationConstraints, ChildArrangement, ConnectionPointOrigin, ConnectorConstraints, Diagram, DiagramComponent, DiagramConstraints, DiagramTools, IExportOptions, LayoutModel, NodeConstraints, NodeModel, Overview, PageSettingsModel, Rect, ScrollSettingsModel, Shape, SnapConstraints, SnapSettingsModel, TreeInfo, ZoomOptions } from '@syncfusion/ej2-angular-diagrams';
import dataUnit from '../../customer-model/Chart60Node.json';
import { ConnectorModel, Margin } from '@syncfusion/ej2-angular-charts';
import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { left } from '@popperjs/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-test-unit',
  templateUrl: './test-unit.component.html',
  styleUrl: './test-unit.component.css'
})
export class TestUnitComponent {
  @ViewChild('diagram',{static:true})
  //@ViewChild('overview') el:ElementRef<HTMLImageElement>
  public diagram: DiagramComponent;
  @ViewChild('nodeItem',{static:true}) public nodeItem:any;
  constructor(private http:HttpClient,private cdr: ChangeDetectorRef,private spinner:NgxSpinnerService){}
  @ViewChild('overview') public overview:Overview;
  public connectors: ConnectorModel;
  public customerData: any = dataCustomer;
  public objectItemAdd: object[]
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
    id: 'positionID',
    parentId: 'reportToPositionID',
    dataSource:new DataManager(this.orgChartData.data),
    doBinding: (nodeModel: NodeModel, item: any, diagram: Diagram,options:TreeInfo) => {
    }
  };

  public scrollSettings: ScrollSettingsModel = {scrollLimit:'Infinity'};
  public pageSettings:PageSettingsModel ={
    // showPageBreaks:true,margin:{left:-200,right:-200,top:-200,bottom:-200}
  }
  public layout: LayoutModel  = {
    type:'HierarchicalTree',
    connectionDirection:'Auto',
    enableRouting:true,
    enableAnimation:true,
    verticalSpacing: 200,
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
    obj.shape = { type: 'HTML' };
    obj.offsetX = 100;
    obj.offsetY = 100;
    obj.height = 500;
    return obj;
  }
  public connDefaults(
    connector: any, diagram: Diagram): ConnectorModel {
      connector.targetDecorator.height = 20;
      connector.targetDecorator.width = 20;
      // connector.connectorSpacing = 30;
      connector.type = 'Orthogonal';
      // connector.bridgeSpace = 100;
      connector.constraints = ConnectorConstraints.ReadOnly | ConnectorConstraints.LineRouting ;
      connector.cornerRadius = 10;
      connector.style.fill = '#858383';
      connector.style.strokeColor = '#858383';
      var getSourceId:any = diagram.nodes.filter((x:any) => x.id == connector.targetID)
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
  public updateCheckValue(id:any){
    this.CheckExpandStatus[id] = this.CheckValue(id);
  }

  public CheckValue(data:any){
    let Nodes:any = this.diagram.nodes.filter((x:any)=>x.id == data);
    return Nodes[0].isExpanded;
  }

  public created(args:Object): void {

    this.spinner.show();
    setTimeout(() => {
      for(const item of this.diagram.nodes){
        this.updateCheckValue(item.id)
      }
      this.diagram.constraints = DiagramConstraints.Default ;
    this.diagram.scrollSettings = { scrollLimit: 'Infinity' };
    this.diagram.tool = DiagramTools.ZoomPan;
    let AllOffset = this.diagram.nodes.map((x:any)=>x.offsetY)
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
      this.SetDynamicNode();
      this.diagram.dataBind();
    this.selectLevel({value:2})
    this.diagram.dataBind();
    }, 1000);

  }

  public selectLevel(args:any){
    this.spinner.show();
    setTimeout(() => {
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
    }, 500);

  }
  public changeHeight(){
    this.spinner.show;
    this.diagram.nodes.forEach((x:any)=>{
      x.height = this.height;
      this.diagram.dataBind();
    })
    this.spinner.hide();
    this.diagram.doLayout();
  }
  public changeWidth(){
    this.spinner.show;
    this.diagram.nodes.forEach((x:any) =>{
      x.width = this.width;
      this.diagram.dataBind();
    })
    this.spinner.hide();
    this.diagram.doLayout();
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
    let nodeData:any = this.diagram.nodes.find((x:any)=> x.id == node);
    this.spinner.show();
    nodeData.isExpanded = !nodeData.isExpanded;
    this.CheckExpandStatus[node] = nodeData.isExpanded;
    this.spinner.hide();
  }

  public ExportOptions(){
    this.spinner.show();
    let styleSheets = document.styleSheets;
    let htmlData:string = this.diagram.getDiagramContent(styleSheets);
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
        mode: 'Download',
        region: 'Content',
        margin : { left: 100, right: 100, top: 10, bottom: 10 },
        stretch: 'Meet',
        format:'PNG',
      });
      this.spinner.hide();
    },
    (error:any) =>{
      console.log("Error",error)
    }
  );
  }
  ExpandAll(){
    this.spinner.show();
    setTimeout(()=>{
  this.diagram.nodes.forEach((x:any)=>{
    if(x.isExpanded == false){
      x.isExpanded = true;
      this.CheckExpandStatus[x.id] = true;
      this.listLevel = this.levelSearch.length;
      this.diagram.dataBind();
      // this.diagram.doLayout();
    }
  });
  this.spinner.hide();
    },500)

  }
  CollapsAll(){
    this.spinner.show();
    setTimeout(() => {
          this.diagram.nodes.forEach((x:any)=>{
      if(x.isExpanded == true){
        x.isExpanded = false;
        this.CheckExpandStatus[x.id] = false;
        this.listLevel = this.levelSearch[0].value;
        this.diagram.dataBind();
        // this.diagram.doLayout();
      }
    })
    this.spinner.hide();
    }, 500);

  }
  ngOnInit(){

    this.isShow.forEach((x:any) =>{
      if(this.orgChartData.isDisplayColumn.toUpperCase().split('|').includes(x.name.toUpperCase())){
        x.visible = true;
      }
    })
    let type = 'org_ReportToInDirect';
    let mat = 'MatrixPos';
    let inDirect = this.orgChartData.data.filter((x:any)=>x.reportToType.toUpperCase() ==type.toUpperCase());
    if(inDirect.length > 0)
      this.inDirect = true;
    let matrix = this.orgChartData.data.filter((x:any)=>x.objectType.toUpperCase() == mat.toUpperCase());
    if(matrix.length > 0)
      this.matrixposition = true;

    let ShowData = this.orgChartData.isDisplayColumn.toUpperCase().split('|');
    ShowData.forEach((x:any)=>{
      this.ShowField[x] = true;
    })
    this.Caption.n0 = this.orgChartData.n0Caption;
    this.Caption.n1 = this.orgChartData.n1Caption;
    this.Caption.n2 = this.orgChartData.n2Caption;
    this.Caption.n3 = this.orgChartData.n3Caption;
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

  public SetDynamicNode(){
    var AllDisplay = this.isShow.filter((x:any) => x.visible == true);
    var Height = AllDisplay.length * 35;
    if(this.orgChartData.boxHeight == null){
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.replacementPersonID == null){
          r.height = Height;
          this.diagram.dataBind();
        }
        else{
          r.height = Height * 1.8;
          this.diagram.dataBind();
        }
      })
    }else{
      this.diagram.nodes.forEach((r:any) =>{
        if(r.data.replacementPersonID == null){
        r.height = this.orgChartData.boxHeight;
        this.diagram.dataBind();
        }else{
          r.height = this.orgChartData.boxHeight * 1.8;
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
