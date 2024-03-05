import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { UserRegistrationRoutes } from '../data/user-registration-routes';
import { UserRegistrationRoute } from '../enums/user-registration-route.enum';
import { UserRegistrationService } from '../services/user-registration.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationGuard implements CanActivate {
  accountDetailsIndex = UserRegistrationRoutes.indexOf(UserRegistrationRoute['accountDetails']);

  constructor(private userRegistrationService: UserRegistrationService, private commonUtilService: CommonUtilService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userRegistrationService.unmatched) {
      this.userRegistrationService.unmatched = { phoneNumber: null };
      this.commonUtilService.navigate(UserRegistrationRoute['signup']);
    } else {
      const url = this.userRegistrationService.unmatched?.lastActiveRoute && `${UserRegistrationRoute[this.userRegistrationService.unmatched?.lastActiveRoute]}`;
      const currentRouteIndex = UserRegistrationRoutes.indexOf(url);

      if (currentRouteIndex > this.accountDetailsIndex && !this.commonUtilService.isAuth()) {
        return false;
      }

      if (url && url !== state.url) {
        const lastActiveRoute = UserRegistrationRoute[this.userRegistrationService.unmatched?.lastActiveRoute];
        const toUrlIndex = UserRegistrationRoutes.indexOf(state.url);
        const fromUrlIndex = UserRegistrationRoutes.indexOf(this.router.url);

        if (toUrlIndex < fromUrlIndex || !lastActiveRoute) {
          return true;
        }

        this.commonUtilService.navigate(lastActiveRoute);
      }
    }
    return true;
  }
}
