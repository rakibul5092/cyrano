import { Component } from '@angular/core';
import { DatingPlatform } from '../../models/dating-platforms';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-dating-account-setup',
  templateUrl: './dating-account-setup.component.html',
  styleUrls: ['./dating-account-setup.component.scss'],
})
export class DatingAccountSetupComponent {
  public newAccounts: DatingPlatform[];
  public existingAccounts: DatingPlatform[];

  constructor(private userRegistrationService: UserRegistrationService) {}

  ionViewWillEnter(): void {
    this.newAccounts = [];
    this.existingAccounts = [];
    this.userRegistrationService.unmatched?.datingPlatforms?.map((datingPlatform, index) => {
      if (this.userRegistrationService.unmatched.datingPlatformsInfo[index]?.accountAlreadyExists) {
        this.existingAccounts.push(datingPlatform);
      } else {
        this.newAccounts.push(datingPlatform);
      }
    });
  }

  public onDatingPlatformsClick(route: 'newAccounts' | 'existingAccounts'): void {
    this.userRegistrationService.routeToNextPage({}, route).subscribe();
  }

  public onNext(): void {
    this.userRegistrationService.routeToNextPage({}, 'payment').subscribe();
  }
}
