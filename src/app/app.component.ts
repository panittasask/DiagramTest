import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(RouterOutlet) outer:any;
  title = 'fusiondiagram';
  public listLevel :any;
  public levelSearch:any=
  [
   {
    value:1,text:"Minimal Layout"
   },
   {
    value:2,text:"Position Chart"
   },
   {
    value:3,text:"Org Chart"
   },
   {
    value:4,text:"Org Unit"
   }
  ];

  constructor(private router:Router){

  }


  public selectLayout(layout:any){
    console.log("layout",layout)
    switch (layout.value){
      case 1:{
        this.router.navigate(['/test']);
        break;
      }
      case 2:{
        this.router.navigate(['/Position']);
        break;
      }
      case 3:{
        this.router.navigate(['/orgChart']);
        break;
      }
      case 4:{
        this.router.navigate(['/orgUnit']);
        break;
      }
    }

    console.log("OutLet",this.outer.component)
  }
  refresh():void{
    window.location.reload();
  }

}
