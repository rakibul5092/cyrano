import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from 'src/app/modules/popup/message-popup/message-popup.component';
import { DatingPlatform } from '../../models/dating-platforms';
import { Unmatched } from '../../models/unmatched.model';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-new-accounts',
  templateUrl: './new-accounts.page.html',
  styleUrls: ['./new-accounts.page.scss'],
})
export class NewAccountsPage {
  public willRentPhoneNumber: boolean = true;
  public noOtherAccountExists: boolean = true;
  public unmatchedInfo: Unmatched;
  public newAccounts: DatingPlatform[];

  /** */
  constructor(private dialog: MatDialog, private userRegistrationService: UserRegistrationService) {}

  ionViewWillEnter(): void {
    this.unmatchedInfo = this.userRegistrationService.unmatched;
    this.newAccounts = [];
    this.userRegistrationService.unmatched?.datingPlatforms?.map((datingPlatform, index) => {
      if (!this.userRegistrationService.unmatched.datingPlatformsInfo[index]?.accountAlreadyExists) {
        this.newAccounts.push(datingPlatform);
      }
    });
  }

  /** */
  public showRentPhoneNumInfo(): void {
    this.dialog.open(MessagePopupComponent, {
      width: '250px',
      data: {
        message: 'ACCOUNT_TAKEOVER.NEW_ACCOUNTS_SECTION.RENT_A_PHONE_NUMBER_INFO',
      },
      panelClass: 'message-popup',
    });
  }

  public onNext(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          datingAccountPhoneNumberDetails: {
            ...this.userRegistrationService.unmatched?.datingAccountPhoneNumberDetails,
            usingExistingPhoneNumber: !this.willRentPhoneNumber,
            noOtherAccountExists: !this.willRentPhoneNumber && this.noOtherAccountExists,
          },
        },
        this.willRentPhoneNumber ? 'billing' : 'setupDatingAccount',
      )
      .subscribe();
  }
}
