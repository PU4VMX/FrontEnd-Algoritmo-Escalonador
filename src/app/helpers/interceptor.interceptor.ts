import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log('401');
        }
        if (err.status === 403) {
          console.log('403');
        }
        if (err.status === 404) {
          err.error.message = 'Não encontrado';
          err.error.status = err.status;
        }
        const error = err.error;
        return throwError(error);
      })
    );
  }
}
