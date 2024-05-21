import { Injectable } from '@angular/core';
import { NgxSpinner } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class SpinnerserviceService {

  constructor(private spinner:NgxSpinner) { }


}
