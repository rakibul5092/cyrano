import { Component } from '@angular/core';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';

@Component({
  selector: 'app-summary-section',
  templateUrl: './summary-section.component.html',
  styleUrls: ['./summary-section.component.scss'],
})
export class SummarySectionComponent {
  /**
   *
   * @param headerService
   */
  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService) {}

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(30);
    this.headerService.headerTitle$.next({ visible: false, title: '' });
  }

  /**
   * Route to next page
   */
  public gotoNextPage(): void {
    this.userRegistrationService.routeToNextPage({}, 'preferenceVsSwipes');
  }
}
