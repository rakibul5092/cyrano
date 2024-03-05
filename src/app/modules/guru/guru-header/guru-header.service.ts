import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderTitle } from 'src/app/models/header-title.model';

@Injectable({
  providedIn: 'root',
})
export class GuruHeaderService {
  private title = new BehaviorSubject<HeaderTitle>(null);
  private notifications = new BehaviorSubject(10);
  private notificationsVisible = new BehaviorSubject(false);

  /***/
  constructor() {}

  /**
   *  Setter and watcher
   *
   * @param title
   * @returns
   */
  public setTitle(title: HeaderTitle): void {
    this.title.next(title);
  }

  public watchTitle(): BehaviorSubject<HeaderTitle> {
    return this.title;
  }

  public setNotifications(count: number): void {
    this.notifications.next(count);
  }

  public watchNotifications(): Observable<number> {
    return this.notifications.asObservable();
  }

  public setNotificationsVisible(visibility: boolean): void {
    this.notificationsVisible.next(visibility);
  }

  public watchNotificationsVisible(): BehaviorSubject<boolean> {
    return this.notificationsVisible;
  }
}
