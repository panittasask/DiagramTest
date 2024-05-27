import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID } from '@angular/core';

const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key:string,value:string):void{
    window.sessionStorage.setItem(key,value);
  }

  getItem(key:string){
    return window.sessionStorage.getItem(key)
  }

  removeItem(key:string,value:string):void{
    localStorage.removeItem(key);
  }
  saveToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  clear():void{
    window.sessionStorage.clear();
  }
}
