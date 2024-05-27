import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Component,  ViewChild } from '@angular/core';
import { Router, RouterOutlet,ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable, buffer, catchError, map } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { GlobalComponents } from './global-components';
import { DiagramService } from './services/diagram.service';
import { UrlParams } from '../model/DataModels/GetParams';
import { Buffer } from 'buffer';
import { WebserviceService } from './services/webservice.service';
import { TopmenuComponent } from './components/topmenu/topmenu.component';



export interface Token{
    access_token:string,
    token_type: string,
    expires_in: any,
    refresh_token:any,
    scope: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(RouterOutlet)public outer:any;
  @ViewChild('outlet')public outlet:any;
  gateway = GlobalComponents.APP_GATEWAY_URL;
  TokenItem : Observable<Token[]>;
  public currentPathName:any;
  public listLevel :any;
  public diagramLevel :any;
  public listLevelSeach = [];
  public UrlParameter:UrlParams;
  public firstPage:boolean;
  public levelSearch:any=
  [

  ];

  constructor(private router:Router,private http:HttpClient,private session:LocalStorageService,private currentPath:ActivatedRoute,private service:DiagramService,private webservice:WebserviceService
  ){

  }

  GetToken(){
    const url = `${this.gateway}/auth/Token`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let body = new URLSearchParams();
    body.set('username','admin')
    body.set('password','123456')
    const options = { headers: headers };
    return this.http.post(
      url,
      body.toString(),
      options
    )
  }
  public selectLevel(level:any):void{
    this.outlet.selectLevel(level);
  }

  public selectLayout(layout:any){
    this.firstPage = false;
    let param = window.sessionStorage.getItem('queryParam')
    switch (layout.value){
      case 1:{
        this.router.navigate(['/PositionChartMinimal'],{
          queryParams:{q:param}
        });
        break;
      }
      case 2:{
        this.router.navigate(['/OrganizationUnitChart'],{
          queryParams:{q:param}
        });
        break;
      }
      case 3:{
        this.router.navigate(['/PositionChart'],{
          queryParams:{q:param}
        });
        break;
      }
      case 4:{
        this.router.navigate(['/OrganizationUnitAndPositionChart'],{
          queryParams:{q:param}
        });
        break;
      }
    }

  }

  setRouting(){

    let model = this.webservice.model;
    if(model['positionid'] != null && this.router.url != '/'){
      this.levelSearch =   [
        // {
        //  value:1,text:"Position Chart Minimal"
        // },
        {
         value:3,text:"Position Chart "
        },
        {
          value:3.1,text:"Position Chart + All Matrix"
         },
         {
          value:3.2,text:"Position Chart + Matrix Only"
         },
        {
          value:2,text:"Organization Unit Chart"
        },
        {
          value:4,text:"Organization and Position Chart"
         },
         {
          value:4.1,text:"Organization and Position Chart + All Matrix"
         },
         {
          value:4.2,text:"Organization and Position Chart + Matrix Only"
         }
       ];
    }
    else if(model['positionid'] == null && this.router.url != '/')
    {
      this.levelSearch =   [
        {
         value:2,text:"Organization Unit Chart"
        }
       ];
    }
    else{
      // this.router.navigate(['/Unauthorize']);
    }

    return this.levelSearch;
  }

  ngOnInit():void{
    // window.sessionStorage.clear();
    let pathName:string;
    this.currentPath.queryParams.subscribe((params:any)=>{
      this.UrlParameter = params;
    })
    this.router.events.subscribe({

      next:(event)=>{
        if(event instanceof NavigationStart) {
          pathName = event.url.split('?')[0];

          this.currentPathName = pathName;

          switch(pathName)
        {
          case '/PositionChartMinimal':{
            this.listLevel = 'Position Chart Minimal';
            break;
          }
          case '/OrganizationUnitChart':{
            this.listLevel = 'Organization Unit Chart';
            break;
          }
          case '/PositionChart':{
            this.listLevel = 'Position Chart ';
            break;
          }
          case '/OrganizationUnitAndPositionChart':{
            this.listLevel = 'Organization and Position Chart';
            break;
          }
          case '/OrganizationUnitAndPositionChartAllMatrix':{
            this.listLevel = 'Organization And PositionChart + All Matrix';
            break;
          }
          case '/OrganizationUnitAndPositionChartMatrixOnly':{
            this.listLevel = 'Organization And PositionChart + MatrixOnly';
            break;
          }
          case '/PositionChartAllMatrix':{
            this.listLevel = 'Position Chart + All Matrix';
            break
          }
          case '/PositionChartMatrixOnly':{
            this.listLevel = 'Position Chart + Matrix Only'
            break;
          }
          case '/OrganizationUnitAndPositionChart All Matrix':{
            this.listLevel = 'Position Chart + Matrix Only'
            break;
          }
          case '/OrganizationUnitAndPositionChart Matrix Only':{
            this.listLevel = 'Position Chart + Matrix Only'
            break;
          }
        }
        if(this.currentPathName == "/"){
          this.firstPage = true;
        }else{
          this.firstPage = false;
        }
        }

      },
      error:(err)=>{
        console.log("Error>>>",err)
      },
      complete:()=>{


      }

    })
    if(window.sessionStorage.getItem('token') === null && window.sessionStorage.getItem('token') === undefined)
      {
        this.GetToken().subscribe({
          next:(x:any)=>
        {
          this.session.saveToken(x.access_token)
        },
        error:(x:any)=>{
          console.log("Error",x)
        },
        complete:()=> {
        },
        }
        );
      }
  }




  ngAfterContentInit(){
    // this.setRouting();
  }

}
