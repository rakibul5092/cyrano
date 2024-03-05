import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-signup-congratulations',
  templateUrl: './signup-congratulations.component.html',
  styleUrls: ['./signup-congratulations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupCongratulationsComponent {
  /**
   * @param headerService
   */
  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService) {}

  // Visible back header button
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(100);
    this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.IMPLICIT_SWIPES' });
  }

  /**
   * Continue to welcome component
   */
  public gotoWelcome(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          rewardedInAppCurrency: true,
        },
        'summary',
      )
      .subscribe();
  }
}
