import { Injectable, effect, signal } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, catchError ,from,of,switchMap,tap} from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { request } from 'http';
import { error } from 'console';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private spinner:NgxSpinnerService) {

   }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      return next.handle(req).pipe(
      tap({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
             // Hide spinner when the response is received
          }
        },
        error: (error) => {
         // Hide spinner when an error occurs
        }
      })
    );
  }

}
