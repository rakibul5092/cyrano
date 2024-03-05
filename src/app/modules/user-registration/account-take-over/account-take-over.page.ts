import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-account-take-over',
  templateUrl: './account-take-over.page.html',
  styleUrls: ['./account-take-over.page.scss'],
})
export class AccountTakeOverPage implements OnInit {
  @ViewChildren('platformOption') platformOption: QueryList<any>;
  @ViewChildren('platformCheckbox') platformCheckbox: QueryList<ElementRef>;

  public datingPlatformTypes = [
    {
      value: false,
      label: 'ACCOUNT_TAKEOVER.PLATFORM_DROPDOWN_OPTIONS.ALREADY_HAVE_AN_ACCOUNT',
    },
    {
      value: true,
      label: 'ACCOUNT_TAKEOVER.PLATFORM_DROPDOWN_OPTIONS.MATCHER_CREATES_NEW_ACCOUNT',
    },
  ];

  datingPlatformsForm: FormGroup = this.fb.group({
    dp: this.fb.array([]),
  });

  /**
   * Represents acount takeover class
   */
  constructor(private userRegistrationService: UserRegistrationService, private fb: FormBuilder) {}

  get datingPlatformsControl(): any {
    return this.datingPlatformsForm?.controls.dp as FormArray;
  }

  ngOnInit(): void {
    this.userRegistrationService.getDatingPlatforms().subscribe((datingPlatforms) => {
      this.datingPlatformsControl.clear();
      datingPlatforms.forEach((datingPlatformOption) => {
        const datingPlatformIndex = this.userRegistrationService.unmatched.datingPlatforms.findIndex((datingPlatform) => datingPlatform._id === datingPlatformOption._id);
        const isAccountAlreadyExists = datingPlatformIndex > -1 ? this.userRegistrationService.unmatched.datingPlatformsInfo[datingPlatformIndex]?.accountAlreadyExists : false;
        const fg = this.fb.group({
          datingPlatform: new FormControl(datingPlatformOption.platform),
          selected: new FormControl(datingPlatformIndex > -1),
          accountAlreadyExists: new FormControl(isAccountAlreadyExists),
          _id: new FormControl(datingPlatformOption._id),
        });
        this.datingPlatformsControl.push(fg);
      });
    });
  }

  ionViewWillEnter(): void {}

  /**
   * validates form and routes to dating account setup page
   */
  public setupDatingAccount(): void {
    const selectedPlatforms = [];
    const selectedPlatformsInfo = [];
    this.datingPlatformsControl.value
      .filter((datingPlatformValue) => datingPlatformValue?.selected)
      .map((datingPlatformValue) => {
        selectedPlatforms.push(datingPlatformValue._id);
        selectedPlatformsInfo.push({
          accountAlreadyExists: datingPlatformValue.accountAlreadyExists,
        });
      });

    this.userRegistrationService
      .routeToNextPage(
        {
          datingPlatforms: selectedPlatforms,
          datingPlatformsInfo: selectedPlatformsInfo,
        },
        'setupDatingAccount',
      )
      .subscribe();
  }
}
