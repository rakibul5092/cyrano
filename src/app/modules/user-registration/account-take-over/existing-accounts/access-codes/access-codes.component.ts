import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserRegistrationService } from '../../../services/user-registration.service';

@Component({
  selector: 'app-access-codes',
  templateUrl: './access-codes.component.html',
  styleUrls: ['./access-codes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessCodesComponent {
  constructor(private userRegistrationService: UserRegistrationService) {}

  public redirectTo(route: 'changePlatformsPassword' | 'automationRequirements'): void {
    this.userRegistrationService.routeToNextPage({}, route).subscribe();
  }
}
