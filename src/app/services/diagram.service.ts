import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponents } from '../global-components';
import { TestUnitComponent } from '../components/test-unit/test-unit.component';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { WebserviceService } from './webservice.service';
import { ActivatedRoute } from '@angular/router';
import { Matrix3D } from '@syncfusion/ej2-angular-charts';
import { rejects } from 'assert';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DiagramService {



  constructor(private http:HttpClient,private webService:WebserviceService,private active:ActivatedRoute) {


  }
  private gateway = GlobalComponents.APP_GATEWAY_URL;
  matrixGroupId:string='';
  // token = window.sessionStorage.getItem('token');

  setMatrixGroupId(){
    return new Promise((resolve,rejects)=>{
      this.active.queryParams.subscribe(params=>{
        let matrixId = params['s']
        this.matrixGroupId = matrixId == "true" ? "All":"";
        resolve(true);
      })
    })

  }

  getPositionChart(){
    const url = `${this.gateway}/Organization/ReportToOrgChart/GetReportToOrgChart`;
    const token = window.sessionStorage.getItem('token');
    const model = this.webService.model;
    let data;
    let headers;
    data = {
      "positionID": model['positionid'],
      "effectiveDate": model['effdate'],
      "displayMode": this.matrixGroupId == 'All' ? "OrgChart-AllMatrixGroup" : "OrgChart",
      "MatrixGroupID":this.matrixGroupId,
    }
    headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(url,data,{headers:headers});
  }
  getOrganizationUnitChart(){
    const token = window.sessionStorage.getItem('token');
    const url = `${this.gateway}/Organization/ReportToOrgChart/GetOrgUnitChart`
    const model = this.webService.model;
    let data;
    let headers;
    this.setMatrixGroupId().then(response=>{
       data = {
        "unitCodeID": model['unitcodeid'],
        "effectiveDate":  model['effdate'],
        "MatrixGroupID":this.matrixGroupId,
      }
       headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

    })
    return this.http.post(url,data,{headers:headers});
  }

  loadDataWithMatrix(matrixGroupId:string){

    const token = window.sessionStorage.getItem('token');
    const url = `${this.gateway}/Organization/ReportToOrgChart/GetReportToOrgChart`;
    const model = this.webService.model;
    const data = {
      "positionID": model['positionid'],
      "effectiveDate":  model['effdate'],
      "MatrixGroupID":matrixGroupId,
      "displayMode": "OrgChart-SpecifyMatrixGroup",
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(url,data,{headers:headers});
  }

  getOrganizationUnitAndPositionChart(){
    const token = window.sessionStorage.getItem('token');
    const url = `${this.gateway}/Organization/ReportToOrgChart/GetReportToOrgUnitChart`
    const model = this.webService.model;
    const data = {
      "positionID": model['positionid'],
      "effectiveDate": model['effdate'],
      "displayMode": "OrgChart",
      "MatrixGroupID":this.matrixGroupId,
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(url,data,{headers:headers});
  }
  ExportDiagram(html:any):Observable<any>{
    const url = 'http://localhost:83/ExportDiagram/home/generatedocument';
    const reqeustData = JSON.stringify({Options:html});

    return this.http.post(url,reqeustData,httpOptions);
  }
}
