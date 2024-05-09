import { ChangeDetectorRef, Component, ViewChild, ViewChildren, ViewEncapsulation, viewChild } from '@angular/core';
import { SnapSettingsModel,ComplexHierarchicalTree, ConnectionPointOrigin, ConnectorConstraints, ConnectorEditing, DataBinding, Diagram, DiagramComponent, DiagramConstraints, DiagramTools, HierarchicalTree, LayoutModel, LineDistribution, LineRouting, NodeModel, SnapConstraints, SnapSettings, ZoomOptions, ScrollSettingsModel, TreeInfo, ConnectorModel, LayoutAnimation } from '@syncfusion/ej2-angular-diagrams';
import Unit from '../../customer-model/OrgUnit.json';
import { DataManager } from '@syncfusion/ej2-data';
import DataPosition from '../../../model/Unit chart_1.json';
import { threadId } from 'worker_threads';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { data } from '../../../model/P_Tee3.json';
import item from '../../../model/Chart/UnitOnly.json';
Diagram.Inject(
  DataBinding,
  HierarchicalTree,
  LayoutAnimation,
  LineDistribution
);

@Component({
  selector: 'app-org-position',
  templateUrl: './org-position.component.html',
  styleUrl: './org-position.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class OrgPositionComponent {
  @ViewChild('diagram') public diagram:DiagramComponent;
  @ViewChild('nodeTemplate') public node:any;
  public titleName:any = Unit.titleName;
  public titleDesc:any =  Unit.titleDesc;
  public dataUnit:any = Unit.data;
  public DataPosition:any = DataPosition;
  public DataChart:any = data;
  public levelSearch:any =[];
  public listLevel:number=2;
  public ShowField:{[key:string]:boolean}={};
  public ExpandStatus:{[key:string]:boolean} ={};
  public InDirectDescription:boolean=false;
  public DataItem:any = item;
  public Caption:any = {
    n0:"",
    n1:"",
    n2:"",
    n3:"",
  }


  constructor(private http:HttpClient,private cdr: ChangeDetectorRef,private spinner:NgxSpinnerService){}

  public data:Object = {
    id:'unitCodeID',
    parentId:'parentUnitCodeID',
    dataSource:new DataManager(this.DataItem.data),
  }
  public connDefaults(conn:any,diagram:Diagram):ConnectorModel{
    conn.targetDecorator.shape = 'None';
    conn.type = 'Orthogonal';
    conn.constraints = ConnectorConstraints.None;
    conn.style.strokeColor = 'gray';
    conn.cornerRadius = 8;
    let getSourceId:any = diagram.nodes.filter((x:any) => x.id == conn.targetID)
      if(getSourceId.length > 0){
        let upper = 'org_UNTReportToIndirect';
        if(getSourceId[0].data.reportToType.toUpperCase() == upper.toUpperCase()){
          conn.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'5,5',};
        }else{
          conn.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
        }
      }else{
        conn.style = { strokeWidth: 2, opacity: 1 ,length:'15%' ,strokeDashArray:'0',};
      }
    return conn;
  }
  public tool: DiagramTools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = { constraints:SnapConstraints.None };
  public nodeDefaults(obj:any):NodeModel{
    obj.shape = { type :'HTML'};
    obj.height = 500;
    obj.width = 500;
    return obj;
  }
  public layout:LayoutModel = {
    type: 'HierarchicalTree',
    enableRouting:true,
    enableAnimation:true,
    margin: { top: 20 },
    verticalSpacing:200,
    horizontalSpacing:120,
  //   getLayoutInfo: (node: Node, tree: TreeInfo) => {
  //     if (!tree.hasSubTree) {
  //         tree.orientation = 'Vertical';
  //         tree.type = 'Right';
  //     }
  // }
    // connectionPointOrigin:ConnectionPointOrigin.SamePoint
  }
  public scrollSettings: ScrollSettingsModel = { scrollLimit: 'Infinity',
  padding:{left:150,right:150,top:150,bottom:200} };

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
  public SetExpandStatus(diagram:any){
    for(const item of diagram){
      this.ExpandStatus[item.id] = item.isExpanded;
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
  public created():void{
    this.spinner.show();
    setTimeout(()=>{
      this.diagram.tool = DiagramTools.ZoomPan;
      this.SetExpandStatus(this.diagram.nodes);
      let offsetY = this.diagram.nodes.map((x:any)=>x.offsetY)
      let levelData = this.findDuplicate(offsetY);
      let levelSearchObj:any =[];
      for(let i=1;i<levelData.length+1;i++){
        levelSearchObj.push({value:i})
      }
      this.levelSearch=[...levelSearchObj];
      for(let i=0;i<levelData.length;i++){
        this.diagram.nodes.forEach((x:any)=>{
          if(levelData[i] == x.offsetY){
            x.data.levelItem = i+1;
          }
        })
      }
      this.selectLevel({value:2});
      this.spinner.hide();
    },500)

  }
  ngOnInit(){
    let CheckDisplay = this.DataItem.isDisplayColumn.toUpperCase().split('|');
    CheckDisplay.forEach((x:any) => {
      this.ShowField[x] = true;
    });

    this.DataItem.data.forEach((x:any) =>{
      let i =0;
      let filterNode = this.DataItem.data.filter((d:any)=>d.unitCodeID != x.unitCodeID)
      filterNode.forEach((e:any) => {
        if(e.parentUnitCodeID == x.unitCodeID){
          i++;
        }
      });
      x.child = i;
    })
    let uppderCase = 'org_UNTReportToIndirect';
    let inDirectCheck = this.DataItem.data.filter((x:any)=> x.reportToType.toUpperCase() == uppderCase.toUpperCase());
    if(inDirectCheck.length > 0){
      this.InDirectDescription = true;
    }

    this.Caption.n0 = this.DataItem.n1Caption;
    this.Caption.n1 = this.DataItem.n2Caption;
    this.Caption.n2 = this.DataItem.n3Caption;
    this.Caption.n3 = this.DataItem.n4Caption;
  }

  public ExpandAll(){
    this.spinner.show();
    setTimeout(()=>{
      this.diagram.nodes.forEach((x:any)=>{
        x.isExpanded = true;
        this.ExpandStatus[x.id] = true;
      })
      this.listLevel = this.levelSearch.length;
      this.spinner.hide();
    },500)
  }
  public CollapseAll(){
    this.spinner.show();
    setTimeout(()=>{
      this.diagram.nodes.forEach((x:any)=>{
        x.isExpanded = false;
        this.ExpandStatus[x.id] = false;
      })
      this.listLevel = this.levelSearch[0].value;
      this.spinner.hide();
    },500)
  }

  public Expand(node:any){
    let nodeData:any = this.diagram.nodes.find((x:any)=>x.id == node)
    nodeData.isExpanded = !nodeData.isExpanded
    this.ExpandStatus[node] = nodeData.isExpanded;
    this.diagram.dataBind();
  }
  public selectLevel(args:any){
    this.spinner.show();
    setTimeout(()=>{
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
    },500)

  }
  public Export(){
    this.spinner.show();
    let htmlData = this.diagram.getDiagramContent();
  const url = 'https://localhost:44301/home/generatedocument';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const options = { headers: headers };
  const requestData = JSON.stringify({ Options: htmlData });

  this.http.post(url, requestData, options)
    .subscribe((result:any) => {
      var base64Data = result.result;

      // Create an Image object
      var img = new Image();
      // Set the src attribute to the base64 data
      img.src = base64Data;

      // When the image is loaded
      img.onload = () => {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx:any = canvas.getContext('2d');
      // Set canvas dimensions.
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw the image onto the canvas with margins
      ctx.drawImage(img, 0, 0, img.width, img.height);
        // Convert canvas content to base64 data
        var modifiedBase64Data = canvas.toDataURL('image/png');
        // Create a link element for downloading
        var link = document.createElement('a');
        link.download = 'diagram.png';
        link.href = modifiedBase64Data;

        // Click the link to trigger download
        link.click();
        this.spinner.hide();
      };
    }, (error) => {
      console.log('error', error);
      // Handle errors here
    });
}


}
