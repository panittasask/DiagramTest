import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { UserModel } from '../../model/user/Usermodel';
import { ActivatedRoute, Router } from '@angular/router';
import { Buffer, atob } from 'buffer';
import { resolve } from 'path';
import { rejects } from 'assert';
import { LocalStorageService } from './local-storage.service';
import { AppComponent } from '../app.component';
import { TopmenuComponent } from '../components/topmenu/topmenu.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponents } from '../global-components';


@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  gateway = GlobalComponents.APP_GATEWAY_URL;
  public model:{[key:string]:string}={};
  public orgActive:{[key:string]:boolean}={};
  public menu:[]=[];
  constructor(private router:Router,private activeRoute:ActivatedRoute,private storage:LocalStorageService,private http:HttpClient) { }



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
  decodeUrl(){
    let routerUrl = this.router.url;

    return new Promise((resolve,rejects) =>{
          if(routerUrl !=  ('/')){
          let replaceURL = this.authorizeUrl(routerUrl);
          let paramterValue = replaceURL.split('q=');
          if(!this.storage.getItem('queryParam'))
          {
              this.storage.setItem('queryParam',paramterValue[1])
          }


          let content = paramterValue[1].split('&R=');
          let enCodeString = Buffer.from(content[0],'base64').toString('utf-8')
          let endCodeSymbol = enCodeString.split('&end');
          this.createModel(endCodeSymbol[0])
         resolve(true);
    }
    })
  }
  setMatrixView(){
    return new Promise((resolve,rejects)=>{
      this.activeRoute.queryParams.subscribe((response:any)=>{
        let ShowMatrixSearch = response['s']
        let searchValue = ShowMatrixSearch == 'true' ? true:false;
        resolve(searchValue);
      })
    })
  }


authorizeUrl(url:any){
  let replacementValue = {
    "XPLPSX":"+",
    "XSLPSX":"/",
    "XEQPSX":"=",
  }
  let replaceUrl = url.replace(/XPLPSX|XSLPSX|XEQPSX/g, (matched:any)=> replacementValue[matched as keyof typeof replacementValue]);
  return replaceUrl;
}
createModel(decodeData:any){
  let splitData = decodeData.split("&");
  splitData.forEach((x:any)=>{
    let makeModel = x.split('=');
    this.model[makeModel[0]] = makeModel[1];
  })
  this.storage.setItem('reporttype',this.model['reporttype'])
}



}
