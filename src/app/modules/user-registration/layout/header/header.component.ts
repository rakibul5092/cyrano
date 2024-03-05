import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { UserRegistrationService } from '../../services/user-registration.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-user-registration-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() progress: number = 30;
  public skip: { visible: boolean; route: string };
  public help: { visible: boolean; route: string };
  public headerTitle: { visible: boolean; title: string };
  private unsubscribeAll: Subject<void> = new Subject();

  /**
   * @param navController
   * @param headerService
   */
  constructor(private navController: NavController, public headerService: HeaderService, private userRegistrationService: UserRegistrationService) {}

  /***/
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.unsubscribe();
  }

  /**
   * Back to previous component
   */
  public back(): void {
    if (this.headerService.handleBackBtnClick.observed) {
      this.headerService.handleBackBtnClick.next();
    } else {
      this.userRegistrationService.routeBackinRegistrationFlow();
    }
  }

  public onClick(event: { visible: boolean; route: string }): void {
    if (event && event.route !== '') {
      this.navController.navigateForward('user-registration/' + event.route, { animated: true, animationDirection: 'forward' });
    }
  }

  /***/
  ngOnInit(): void {
    this.headerService.showHelp$.pipe(takeUntil(this.unsubscribeAll)).subscribe((value) => {
      this.help = value;
    });

    this.headerService.showSkip$.pipe(takeUntil(this.unsubscribeAll)).subscribe((value) => {
      this.skip = value;
    });

    this.headerService.headerTitle$.pipe(takeUntil(this.unsubscribeAll)).subscribe((value) => {
      this.headerTitle = value;
    });

    this.headerService.headerProgress$.pipe(takeUntil(this.unsubscribeAll)).subscribe((value) => {
      this.progress = value;
    });
  }
}
