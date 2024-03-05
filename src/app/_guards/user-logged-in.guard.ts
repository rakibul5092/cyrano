import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheKeys, CacheService } from '../services/cache-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoggedInGuard implements CanActivate {
  constructor(private cache: CacheService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cache.getLocalStorage(CacheKeys.token);
    if (token) {
      return this.router.createUrlTree(['../home']);
    }
    return true;
  }
}
