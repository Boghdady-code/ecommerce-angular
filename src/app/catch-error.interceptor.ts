import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './auth/alert/alert.service';

@Injectable()
export class catchErrorInterceptor implements HttpInterceptor {
  errors: string[] = [];
  constructor(private alert: AlertService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.error.errors) {
          this.errors = [];
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errors.push(error.error.errors[key].msg);
            }
          }
        }

        if (error.error.message) {
          this.errors.push(error.error.message);
        }

        this.alert.error.next(this.errors);
        setTimeout(() => {
          this.errors = [];
        }, 3000);
        return throwError(error);
      })
    );
  }
}
