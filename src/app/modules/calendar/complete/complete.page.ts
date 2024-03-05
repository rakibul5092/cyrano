import { Component } from '@angular/core';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage {
  constructor(private userRegistrationService: UserRegistrationService, private headerService: HeaderService) {}

  ionViewWillEnter = (): void => {
    this.headerService.showCalendar$.next({ visible: true, route: '' });
  };

  ionViewWillLeave = (): void => {
    this.headerService.showCalendar$.next({ visible: false, route: '' });
  };

  public gotoNextPage(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          initiatedSendRequestFlow: true,
        },
        'accountTakeOver',
      )
      .subscribe();
  }
}
