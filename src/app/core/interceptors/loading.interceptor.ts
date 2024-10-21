import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private _NgxSpinnerService:NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this._NgxSpinnerService.show(); // This will be executed whenever a request is sent (the loading screen will be displayed)

    return next.handle(request).pipe(finalize(() => { // pipe() is a method for Observable elements like subscribe() and it binds something to the left-side's return when the response is returned
      this._NgxSpinnerService.hide();
    }));
  }
}
