import { Component } from '@angular/core';
import { DatingPlatform } from '../../models/dating-platforms';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-existing-accounts',
  templateUrl: './existing-accounts.page.html',
  styleUrls: ['./existing-accounts.page.scss'],
})
export class ExistingAccountsPage {
  public existingAccounts: DatingPlatform[];

  constructor(private userRegistrationService: UserRegistrationService) {}

  ionViewWillEnter(): void {
    this.existingAccounts = [];
    this.userRegistrationService.unmatched?.datingPlatforms?.map((datingPlatform, index) => {
      if (this.userRegistrationService.unmatched.datingPlatformsInfo[index]?.accountAlreadyExists) {
        this.existingAccounts.push(datingPlatform);
      }
    });
  }

  public onNext(): void {
    this.userRegistrationService.routeToNextPage({}, 'accessCodes').subscribe();
  }
}
