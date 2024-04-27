
import dataCustomer from '../../customer-model/dataCustomer';
import {​​​​​​​​ getInstance }​​​​​​​​ from '@syncfusion/ej2-base';
import jsPDF from 'jspdf';
import dataJsonUsing from '../../customer-model/Chart.json';
import chart60node from '../../customer-model/Chart60Node.json';
import orgUnit from '../../customer-model/OrgUnit.json';
import orgChartData from '../../../model/P_Tee3.json';
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

  public data: Object = {
    id: 'positionID',
    parentId: 'reportToPositionID',
    dataSource:new DataManager(this.orgChartData.data),
    doBinding: (nodeModel: NodeModel, item: any, diagram: Diagram,options:TreeInfo) => {
    }
  };

  public scrollSettings: ScrollSettingsModel = {scrollLimit:'Infinity'};
  public pageSettings:PageSettingsModel ={
    showPageBreaks:true,margin:{left:-200,right:-200,top:-200,bottom:-200}
  }
  public layout: LayoutModel  = {
    type:'HierarchicalTree',
    connectionDirection:'Auto',
    verticalSpacing: 200,
    enableRouting:true,
    enableAnimation:false,
    horizontalSpacing: 90,
    connectionPointOrigin: ConnectionPointOrigin.SamePoint,
    getLayoutInfo: (node: Node, options: TreeInfo,) => {
      if (!options.hasSubTree) {
        options.type = 'Balanced';
          options.orientation = 'Horizontal';
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

  public created(args:Object): void {
    this.spinner.show();
    this.diagram.constraints = DiagramConstraints.Default ;
    this.diagram.scrollSettings = { scrollLimit: 'Infinity' };
    this.diagram.tool = DiagramTools.ZoomPan;
    let AllOffset = this.diagram.nodes.map((x:any)=>x.offsetY)
    let cd = this.findDuplicate(AllOffset);
    let arrObj:any=[];
    for(var i = 1 ;i < cd.length +1;i++){
      arrObj.push({value:i})
    }
    this.levelSearch=[...arrObj];
    for(var i=0;i<cd.length;i++){
      this.diagram.nodes.forEach((x:any)=>{
        if(cd[i] == x.offsetY){
          x.data.levelItem = i+1;
        }
      })
    }
    (async() =>{

      for await(let item of this.diagram.nodes){

        // item.isExpanded = false;
        // await this.sleep(10);

      }
      await this.SetDynamicNode();
        this.height = this.diagram.nodes[0].height ? this.diagram.nodes[0].height : 500;
        this.width = this.diagram.nodes[0].width ? this.diagram.nodes[0].width : 450;
      this.diagram.dataBind();
      this.diagram.doLayout();
      if(this.diagram.nodes[0].wrapper != undefined){
        this.diagram.bringToCenter(this.diagram.nodes[0].wrapper.bounds);
      }
    })();
    this.selectLevel({value:2})
    if(this.diagram.nodes[0].wrapper != undefined){
      this.diagram.bringToCenter(this.diagram.nodes[0].wrapper.bounds);
    }
    // this.diagram.nodes.forEach((x:any)=>{
    //   x.height = h;
    //   this.diagram.dataBind();
    // }
    //this.diagram.doLayout();
    let zoomoptions:ZoomOptions ={
      type:'ZoomOut',
      zoomFactor:1.2
    }
    this.diagram.zoom(0.2);
    this.spinner.hide();
    this.diagram.dataBind();
  }

  public selectLevel(args:any){
    this.spinner.show();
    if(args != null){
      this.diagram.nodes.forEach((x:any)=>{
        if(x.data.levelItem < args.value){
          x.isExpanded = true;
        }else{
          x.isExpanded = false;
        }
        this.diagram.dataBind();
      })

    }
    this.spinner.hide();
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
    let nodeData:any = this.diagram.nodes.find((x:any)=> x.id == node);
    this.spinner.show();
    nodeData.isExpanded = !nodeData.isExpanded;
    this.diagram.dataBind();
    if(this.diagram.nodes[0].wrapper != undefined){
      //this.diagram.bringToCenter(this.diagram.nodes[0].wrapper.bounds);
    }
    // this.diagram.fitToPage();
      this.spinner.hide();
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
      this.diagram.doLayout();
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
        this.diagram.doLayout();
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
    this.diagram.doLayout();
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
