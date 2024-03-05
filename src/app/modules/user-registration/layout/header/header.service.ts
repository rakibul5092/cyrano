import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class HeaderService {
  public showHeader$ = new BehaviorSubject<boolean>(true);
  public showBackButton$ = new BehaviorSubject<boolean>(true);
  public congratulations$ = new BehaviorSubject<boolean>(false);
  public showCalendar$ = new BehaviorSubject<{ visible: boolean; route: string }>({ visible: false, route: '' });
  public showHelp$ = new BehaviorSubject<{ visible: boolean; route: string }>({ visible: false, route: '' });
  public showSkip$ = new BehaviorSubject<{ visible: boolean; route: string }>({ visible: false, route: '' });
  public headerTitle$ = new BehaviorSubject<{ visible: boolean; title: string }>({ visible: false, title: '' });
  public headerProgress$ = new BehaviorSubject<number>(0);
  public handleBackBtnClick = new Subject<void>();
}
