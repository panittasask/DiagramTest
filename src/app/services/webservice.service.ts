import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { UserModel } from '../../model/user/Usermodel';
import { ActivatedRoute, Router } from '@angular/router';
import { Buffer, atob } from 'buffer';
import { resolve } from 'path';
import { rejects } from 'assert';
import { LocalStorageService } from './local-storage.service';
import { AppComponent } from '../app.component';
import { TopmenuComponent } from '../components/topmenu/topmenu.component';


@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  public model:{[key:string]:string}={};
  public orgActive:{[key:string]:boolean}={};
  public menu:[]=[];
  constructor(private router:Router,private activeRoute:ActivatedRoute,private storage:LocalStorageService) { }

  logIn(){

  }
  decodeUrl(){
    let routerUrl = this.router.url;

    return new Promise((resolve,rejects) =>{
          if(routerUrl !=  ('/')){
          let replaceURL = this.authorizeUrl(routerUrl);
          let paramterValue = replaceURL.split('q=');
          let url = this.storage.getItem('queryParam')
          if(!this.storage.getItem('queryParam'))
          {
              console.log("infuntion",paramterValue)
              this.storage.setItem('queryParam',paramterValue[1])
          }


          console.log("URLEXITS",this.storage.getItem('queryParam'))
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
      this.activeRoute.queryParams.subscribe(response=>{
        let ShowMatrixSearch = response['s']
        let searchValue = ShowMatrixSearch == 'true' ? true:false;
        resolve(true);
        return searchValue;
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
