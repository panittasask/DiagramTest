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
    value:1,text:"Position Chart Minimal"
   },
   {
    value:3,text:"Position Chart Color"
   },
   {
    value:2,text:"Organization Unit Chart"
   },
   {
    value:4,text:"Organization Unit and Position Chart"
   }
  ];

  constructor(private router:Router){

  }


  public selectLayout(layout:any){

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


  }
  refresh():void{
    window.location.reload();
  }
  ngOnInit():void{
    switch(location.pathname)
    {
      case '/test':{
        this.listLevel = 'Position Chart Minimal';
        break;
      }
      case '/Position':{
        this.listLevel = 'Organization Unit Chart';
        break;
      }
      case '/orgChart':{
        this.listLevel = 'Position Chart Color';
        break;
      }
      case '/orgUnit':{
        this.listLevel = 'Organization Unit and Position Chart';
        break;
      }
    }
  }

}
