import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatingPlatform } from '../../../models/dating-platforms';
import { UserRegistrationService } from '../../../services/user-registration.service';

@Component({
  selector: 'app-platforms-passwords',
  templateUrl: './platforms-passwords.component.html',
  styleUrls: ['./platforms-passwords.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformsPasswordsComponent {
  public existingAccounts: DatingPlatform[];

  form: FormGroup = this.fb.group({
    passwords: this.fb.array([]),
  });

  constructor(private userRegistrationService: UserRegistrationService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  get passwordsControl(): any {
    return this.form?.controls.passwords as FormArray;
  }

  ionViewWillEnter(): void {
    this.existingAccounts = [];
    this.passwordsControl.clear();
    this.userRegistrationService.unmatched?.datingPlatforms?.map((datingPlatform, index) => {
      const datingPlatformInfo = this.userRegistrationService.unmatched.datingPlatformsInfo[index];
      if (datingPlatformInfo?.accountAlreadyExists) {
        this.existingAccounts.push(datingPlatform);

        const fg = this.fb.group({
          password: new FormControl(datingPlatformInfo.password, Validators.required),
          hide: new FormControl(true),
          platform: new FormControl(datingPlatform.platform),
          index: new FormControl(index),
        });
        this.passwordsControl.push(fg);
      }
    });
    this.cdr.detectChanges();
  }

  public onSave(): void {
    const datingPlatformsInfo: any = [...this.userRegistrationService.unmatched.datingPlatformsInfo];
    this.passwordsControl.value.map((passwordControl) => {
      datingPlatformsInfo[passwordControl.index] = {
        ...datingPlatformsInfo[passwordControl.index],
        password: passwordControl.password,
      };
    });
    this.userRegistrationService
      .routeToNextPage(
        {
          datingPlatformsInfo: datingPlatformsInfo,
        },
        'setupDatingAccount',
      )
      .subscribe();
  }

  public toggleHideControlValue(formGroup: FormGroup, previousValue: boolean): void {
    formGroup.get('hide').setValue(!previousValue);
  }
}
