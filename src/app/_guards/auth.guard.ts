import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonUtilService } from '../services/common-utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /***/
  constructor(private commonUtilService: CommonUtilService) {}

  /**
   * Can user active route based on auth status
   *
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.commonUtilService.isAuth();
  }
}
