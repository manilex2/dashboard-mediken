import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  serverURL = `${environment.serverURL}/authenticate`;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.serverURL != request.url) {
      try {
        const token = localStorage.getItem('auth_token');

        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate') });

        return next.handle(request);

      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      return next.handle(request);
    }
  }
}
