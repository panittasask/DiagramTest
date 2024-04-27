import { Component, ViewChild, ViewChildren, ViewEncapsulation, viewChild } from '@angular/core';
import { ComplexHierarchicalTree, ConnectionPointOrigin, ConnectorConstraints, ConnectorEditing, DataBinding, Diagram, DiagramComponent, DiagramConstraints, DiagramTools, HierarchicalTree, LayoutModel, LineDistribution, LineRouting, NodeModel, ZoomOptions } from '@syncfusion/ej2-angular-diagrams';
import Unit from '../../customer-model/OrgUnit.json';
import { DataManager } from '@syncfusion/ej2-data';
import { ConnectorModel } from '@syncfusion/ej2-angular-charts';
Diagram.Inject(
  DataBinding,
  ComplexHierarchicalTree,
  HierarchicalTree,
  LineRouting,
  LineDistribution,
  ConnectorEditing
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




  public data:Object = {
    id:'objectID',
    parentId:'parentObjectID',
    dataSource:new DataManager(this.dataUnit),
  }
  public connDefaults(conn:any,diagram:Diagram):ConnectorModel{
    conn.type = 'Orthogonal';
    // conn.constraints = ConnectorConstraints.Default;
    return conn;
  }
  public nodeDefaults(obj:any):NodeModel{
    obj.shape = { type :'HTML'};
    obj.height = 500;
    obj.width = 500;
    obj.expandIcon.shape = 'Plus';
    obj.collapseIcon.shape = "Minus";
    return obj;
  }
  public layout:LayoutModel = {
    type:'HierarchicalTree',
    enableAnimation:false,
    enableRouting:false,
    // connectionPointOrigin:ConnectionPointOrigin.SamePoint
  }
  onWheel(event:any){
    let Zoom:ZoomOptions;
    if(event.wheelDelta > 0){
      Zoom = { type:'ZoomIn',zoomFactor:0.1};
    }else{
      Zoom = { type:'ZoomOut',zoomFactor:0.1};
    }
    this.diagram.zoomTo(Zoom)
    this.diagram.dataBind();
  }

  public created():void{
    this.diagram.tool = DiagramTools.ZoomPan;
    console.log("Diagram",this.diagram)
    console.log("Node",this.node);
    this.diagram.zoom(0.2);
    //  this.diagram.fitToPage({mode:'Page'})
  }
  ngOnInit(){
    console.log("This Data",this.dataUnit)
  }
  public onClick(args:Object){
    console.log("args",args)
  }

  public collaps(){
    this.diagram.nodes[0].isExpanded = !this.diagram.nodes[0].isExpanded;
    console.log("diagram.node",this.diagram.nodes)
    console.log(this.diagram.nodes[0].isExpanded)
    this.diagram.dataBind();
  }

  public clickToCheck(data:any){

  }
}
