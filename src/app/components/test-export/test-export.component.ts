import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewEncapsulation, ViewChild,Inject } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import {
  Diagram, UndoRedo, Connector, NodeModel, ConnectorModel, IExportOptions, Rect, StackPanel, SnapConstraints, DiagramTools, ImageElement, SnapSettingsModel, TextElement, Container, ScrollSettingsModel, LayoutModel, TreeInfo,
  ZoomOptions
} from '@syncfusion/ej2-diagrams';
Diagram.Inject(UndoRedo);
import data from '../../../model/Unit chart_1.json';

/**
 * Default FlowShape sample
 */

@Component({
  selector: 'TestExportComponent',
  templateUrl: 'test-export.component.html',
  styleUrls: ['test-export.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TestExportComponent {
  @ViewChild('diagram')
  //Diagram Properties
  public diagram: DiagramComponent;
  constructor(private http: HttpClient) {​​​​​​​

}​​​​​​​
ngOnInit(): void {
}
CheckVisible(data:any){
  return true;
}
public data: Object = {
  id:'unitCodeID',
  parentId:'parentUnitCodeID', dataSource: new DataManager(data.data)
};

public layout: LayoutModel = {
  type:'HierarchicalTree',
  connectionDirection:'Auto',
  verticalSpacing: 400,
  enableRouting:true,
  enableAnimation:false,
  horizontalSpacing: 120,
  margin:{top:20},
  getLayoutInfo: (node: Node, options: TreeInfo,) => {

    if (!options.hasSubTree) {
        options.type = 'Alternate';
        options.orientation = 'Vertical';
    }
  },
};

public nodeDefaults(obj: NodeModel): NodeModel {

  obj.shape = { type: 'HTML' };
  obj.height=500;
  obj.width=450;
  return obj;
};
onWheel(event:any){
  // let Zoom:ZoomOptions;
  // event.preventDefault();
  // if(event.wheelDelta > 0){
  //   Zoom = { type:'ZoomIn',zoomFactor:0.1};
  // }else{
  //   Zoom = { type:'ZoomOut',zoomFactor:0.1};
  // }
  // this.diagram.zoomTo(Zoom)
  // this.diagram.dataBind();
}
public connDefaults(connector: any): ConnectorModel {
  connector.targetDecorator.shape = 'None';
  connector.type = 'Orthogonal';
  connector.style.strokeColor = 'gray';
  return connector;
};

public tool: DiagramTools = DiagramTools.ZoomPan;
public snapSettings: SnapSettingsModel = { constraints:SnapConstraints.None };
public scrollSettings: ScrollSettingsModel = { scrollLimit: 'Infinity',
padding:{left:200,right:200,top:200,bottom:200} };



onclick() {
  let htmlData = this.diagram.getDiagramContent();
  const url = 'https://localhost:44301/home/generatedocument';
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const options = { headers: headers };
  const requestData = JSON.stringify({ Options: htmlData });

  this.http.post(url, requestData, options)
    .subscribe((result:any) => {
      console.log('success', result);
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
      };
    }, (error) => {
      console.log('error', error);
      // Handle errors here
    });
}
  public created(): void {
    // this.diagram.fitToPage();
  }

}
export interface EmployeeInfo {
  Name: string;
  Designation: string;
  ImageUrl: string;
}
