import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheService, CacheKeys } from '../cache-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /***/
  constructor(private cacheService: CacheService) {}

  /**
   * Auth Interceptor
   *
   * @param req
   * @param next
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {
      Authorization: '',
    };
    const idToken = this.cacheService.getSessionData(CacheKeys.token);

    if (idToken) {
      if (req.url.search(environment.url) > -1) {
        headers.Authorization = 'Bearer ' + idToken;
      }
      req = req.clone({
        setHeaders: headers,
      });
      return next.handle(req);
    } else {
      req = req.clone({
        setHeaders: headers,
      });
      return next.handle(req);
    }
  }
}
