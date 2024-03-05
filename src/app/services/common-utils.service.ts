import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { APPLICATION_ERRORS } from '../lookups/error.codes.lookup';
import { ICONS } from '../theme/theme.icons';
import { ThemeService } from '../theme/theme.service';
import { AlertService } from './alert.service';
import { CacheKeys, CacheService } from './cache-service.service';
import { ChangeDetectorService } from './change-detector';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilService {
  public toggleMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _icons: (typeof ICONS)['light'] = ICONS[this.themeService.getActiveTheme().icons];
  private lang: string;

  /***/
  constructor(
    private themeService: ThemeService,
    private cacheService: CacheService,
    private translateService: TranslateService,
    private changeDetectorService: ChangeDetectorService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.lang = (this.cacheService.getLocalStorage(CacheKeys.activeLanguage) as string) || 'en';
  }

  /**
   * Get icons from icons list
   * Returns: type of light icons object
   */
  get icons(): (typeof ICONS)['light'] {
    return this._icons;
  }

  /**
   * Get active language
   */
  get activeLanguage(): string {
    return this.lang;
  }

  /**
   * Get active theme
   */
  get activeTheme(): string {
    return this.themeService.getActiveTheme().key;
  }

  /**
   * angular navigate
   *
   * @param path
   * @param params
   */
  public navigate(path, params = {}): Promise<boolean> {
    return this.router.navigate([path], { queryParams: params });
  }

  /**
   * handel error
   *
   * @param formGroup
   * @param controlName
   * @param errorName
   */
  public onFormControlError(formGroup: UntypedFormGroup, controlName, errorName): boolean {
    const control = formGroup.controls[controlName];
    return control.touched && control.errors && control.errors[errorName];
  }

  /**
   * switch current them (dark/light)
   */
  public changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
    this.cacheService.saveLocalStorage(CacheKeys.activeTheme, theme);
    this._icons = ICONS[this.themeService.getActiveTheme().icons];
  }
  /**
   * CHANGE THE I18 translation
   *
   * @param lang
   */
  public changeLanguage(lang: string): void {
    this.lang = lang;
    this.translateService.use(lang);
    this.cacheService.saveLocalStorage(CacheKeys.activeLanguage, lang);
    this.changeDetectorService.emitTranslationChange(lang);
  }

  /** */
  public cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  /**
   * compare 2 objects
   *
   * @param objA
   * @param objB
   * @param map
   */
  public deepEqual(objA, objB, map = new WeakMap()): boolean {
    // P1
    if (Object.is(objA, objB)) {
      return true;
    }

    // P2
    if (objA instanceof Date && objB instanceof Date) {
      return objA.getTime() === objB.getTime();
    }
    if (objA instanceof RegExp && objB instanceof RegExp) {
      return objA.toString() === objB.toString();
    }

    // P3
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }

    // P4
    if (map.get(objA) === objB) {
      return true;
    }
    map.set(objA, objB);

    // P5
    const keysA = Reflect.ownKeys(objA);
    const keysB = Reflect.ownKeys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Reflect.has(objB, key) || !this.deepEqual(objA[key], objB[key], map)) {
        return false;
      }
    }
    return true;
  }

  public isAuth(): boolean {
    const rememberMe = this.cacheService.getLocalStorage(CacheKeys.rememberMe) || false;
    const token = rememberMe ? this.cacheService.getLocalStorage(CacheKeys.token) : this.cacheService.getSessionData(CacheKeys.token);

    if (token) {
      return true;
    } else {
      this.alertService.alertException(APPLICATION_ERRORS.UNAUTHORIZED_ERROR);
      setTimeout(() => {
        this.router.navigate(['../auth']);
      }, 500);
      return false;
    }
  }
}
