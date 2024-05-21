import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, catchError ,tap} from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { request } from 'http';
import { error } from 'console';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private localService:LocalStorageService,private spinner:NgxSpinnerService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    return next.handle(req).pipe(
      tap({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();  // Hide spinner when the response is received
          }
        },
        error: (error) => {
          this.spinner.hide();  // Hide spinner when an error occurs
        }
      })
    );
  }
}
