import { Component, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
@Component({
  selector: 'spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrl: './spinner-loading.component.css',
})
export class SpinnerLoadingComponent implements OnInit {
  constructor(
    private dialog: MatDialog
  ) 
  {
    
  }

  ngOnInit() {
  }



}
