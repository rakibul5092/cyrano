import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExceptionsService } from '../exceptions.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  /***/
  constructor(public router: Router, private readonly injector: Injector) {}

  /**
   * Intercept http calls and handle errors
   *
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        async (errorResponse: HttpErrorResponse) => {
          if (errorResponse && errorResponse.error && errorResponse.url.search(environment.url) > -1) {
            const exceptionsService = this.injector.get(ExceptionsService);
            await exceptionsService.handleGeneralExceptions(errorResponse);
          }
        },
      ),
    );
  }
}
