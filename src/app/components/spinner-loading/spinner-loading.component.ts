import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrl: './spinner-loading.component.css',
})
export class SpinnerLoadingComponent implements OnInit {
  constructor(
    private dialog: MatDialog,private spinner:NgxSpinnerService
  )
  {

  }
  public spinnerText:string='Loading...';
  @Input() Open = new EventEmitter<string>();

  ngOnInit() {

  }

  show(message:string){
    if(message != null && message != "" && message != undefined){
      this.spinnerText = message;
    }
    this.spinner.show();
  }
  hide(){
    this.spinner.hide();
  }


}
