import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-profile-completed',
  templateUrl: './profile-completed.component.html',
  styleUrls: ['./profile-completed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCompletedComponent {
  constructor(private userRegistrationService: UserRegistrationService) {}

  /**
   * Continue to next component
   */
  public onContinue(): void {
    this.userRegistrationService.routeToNextPage({}, 'ageHeight').subscribe();
  }
}
