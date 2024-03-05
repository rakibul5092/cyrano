import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeDetectorService {
  public userInfoChanged = new BehaviorSubject(null);
  private authChanged = new Subject<any>();
  private translationChanged = new Subject<string>();

  /***/
  constructor() {}

  // -------------- auth---------------
  emitAuth = (): void => this.authChanged.next(true);
  watchAuthChanges = (): Observable<any> => this.authChanged.asObservable();

  // -------------- userInfoChanged ---------------
  emitUserInfo = (userInfo): void => this.userInfoChanged.next(userInfo);
  watchUserInfoChanges = (): Observable<any> => this.userInfoChanged.asObservable();

  // -------------- translation change ---------------
  emitTranslationChange = (lang: string): void => this.translationChanged.next(lang);
  watchTranslationChanges = (): Observable<any> => this.translationChanged.asObservable();
}
