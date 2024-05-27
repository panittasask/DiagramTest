import { Injectable, effect, signal } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, catchError ,from,of,switchMap,tap, throwError} from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { request } from 'http';
import { error } from 'console';
import { WebserviceService } from './webservice.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private spinner:NgxSpinnerService,private webService:WebserviceService) {

   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req).pipe(
        catchError((err) => {
          if(err.status === 401){
            this.webService.GetToken();
            return next.handle(req);
          }
          return throwError(()=>err);
        })
    );
  }

}
