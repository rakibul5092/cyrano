import { Component } from '@angular/core';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.page.html',
  styleUrls: ['./account-setup.page.scss'],
})
export class AccountSetupPage {
  constructor(private userRegistrationService: UserRegistrationService) {}
  /**
   * Route to next page
   */
  public gotoNextPage(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          initiatedCalendarSetup: true,
        },
        'accounts',
      )
      .subscribe();
  }
}
