import { Component, ViewChild } from '@angular/core';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { DataManager } from '@syncfusion/ej2-data';
import { AnnotationConstraints, ConnectionPointOrigin, ConnectorConstraints, Diagram, DiagramComponent, DiagramTools, LayoutModel, NodeConstraints, NodeModel, PageSettingsModel, ScrollSettingsModel, Shape, SnapConstraints, SnapSettingsModel, TreeInfo } from '@syncfusion/ej2-angular-diagrams';
import dataUnit from '../../customer-model/Chart60Node.json';
import { ConnectorModel, Margin } from '@syncfusion/ej2-angular-charts';
import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { left } from '@popperjs/core';
@Component({
  selector: 'app-test-unit',
  templateUrl: './test-unit.component.html',
  styleUrl: './test-unit.component.css'
})
export class TestUnitComponent {
  @ViewChild('diagram') diagram:DiagramComponent;
  @ViewChild('nodeItem') nodeItem:any;
  public dataUnit :any  = dataUnit;

  constructor(private http:HttpClient){}


  public tool= DiagramTools.ZoomPan;
  public layout:LayoutModel = {
    type:'OrganizationalChart',
    connectionDirection:'Orientation',
    enableRouting:false,
    enableAnimation:true,
    verticalSpacing:120,
    horizontalSpacing:90,
    connectionPointOrigin:ConnectionPointOrigin.SamePoint,
  }
  public connDefaults(con:any,diagram:Diagram):ConnectorModel {
    con.targetDecorator.height = 20;
    con.targetDecorator.width = 20;
    con.type = 'Orthogonal';
    con.constraints = ConnectorConstraints.ReadOnly & ConnectorConstraints.LineRouting;
    con.cornerRadius = 10;
    con.style.strokeColor = '#858383';
    con.style.fill = '#858383';
    con.style = {strokeWidth:2,opacity:1};
    con.targetDecorator.shape = 'none';
    con.maxSegmentThumb = 2;
    return con;
  }
  public scrollSettings: ScrollSettingsModel = {scrollLimit:'Infinity',padding :{left:50,right:50,top:50,bottom:50}};
  public nodeDefaults(obj:any):NodeModel {
    obj.shape = {type:'HTML'};
    obj.constraints =  NodeConstraints.Default & ~(NodeConstraints.Select)
    obj.height = 300;
    obj.width = 450;
    return obj;
  }
  public data:Object={
    id:'positionID',
    parentId:'reportToPositionID',
    dataSource:new DataManager(this.dataUnit),
    doBinding:(nodeModel:NodeModel,item:any,diagram:Diagram,options:TreeInfo) =>{
      nodeModel.annotations=[
        {
          constraints:AnnotationConstraints.ReadOnly
        }
      ]
    }
  }
  public pageSettings:PageSettingsModel={
    orientation:'Landscape',margin:{left:100,right:100,top:100,bottom:100}
  }
  public snapSettings :SnapSettingsModel = {
    constraints:SnapConstraints.None
  };
  public created(){
    console.log("Diagram >>>>>>",this.diagram)
  }
  public nodeCreate(){
    console.log("NodeItem >>>>>>",this.nodeItem)
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


  public ExportOptions(){
    //this.diagram.fitToPage();
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
        // region: 'Content',
        stretch: 'Meet',
      })
    },
    (error:any) =>{
      console.log("Error",error)
    }
  );
  }
}
