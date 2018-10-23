import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService){}
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._auth.getToken();
    if(token){
      req = req.clone({
        setHeaders: {Authorization: token}
      });
    }
    return next.handle(req)
  }
}
