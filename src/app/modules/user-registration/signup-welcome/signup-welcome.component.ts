import { Component } from '@angular/core';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-signup-welcome',
  templateUrl: './signup-welcome.component.html',
  styleUrls: ['./signup-welcome.component.scss'],
})
export class SignupWelcomeComponent {
  acceptedConditions: boolean;

  constructor(private userRegistrationService: UserRegistrationService, private headerService: HeaderService) {}

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(18.75);
    this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.FAMILIAR_PLACES' });
    this.acceptedConditions = this.userRegistrationService.unmatched.acceptedConditions;
  }

  ionViewWillLeave(): void {
    this.headerService.headerTitle$.next({ visible: false, title: '' });
  }

  /**
   * On agree on terms and continue to next component
   */
  public onAgree(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          acceptedConditions: true,
        },
        'accountDetails',
      )
      .subscribe();
  }
}
