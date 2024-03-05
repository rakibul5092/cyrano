import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-date-preferences',
  templateUrl: './date-preferences.component.html',
  styleUrls: ['./date-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePreferencesComponent {
  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService) {}

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(62.5);
  }

  public onSelectDatePreferences(): void {
    this.userRegistrationService.routeToNextPage({}, 'goalsInterests').subscribe();
  }

  public onSkip(): void {
    this.userRegistrationService.routeToNextPage({}, 'swipe').subscribe();
  }
}
