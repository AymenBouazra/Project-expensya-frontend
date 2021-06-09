import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/service/spinner.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.requestStarted();
    return next.handle(request)
    .pipe(
      tap(
        event=> {
          if(event instanceof HttpResponse){
            this.spinnerService.requestEnded();
          }
        },
        (error:HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
        }
      )
    );
  }
}
function tap(arg0: (event: any) => void, arg1: (error: HttpErrorResponse) => void): import("rxjs").OperatorFunction<HttpEvent<any>, HttpEvent<unknown>> {
  throw new Error('Function not implemented.');
}

