import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationService } from 'src/app/modules/user-registration/services/user-registration.service';
import { AccountTypes } from '../../../../enums/account-type.enum';
import { CommonUtilService } from '../../../../services/common-utils.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountTypeComponent implements OnInit {
  public accountFormGroup: FormGroup;
  public accountTypes = AccountTypes;
  constructor(private fb: FormBuilder, public commonUtilService: CommonUtilService, private userRegistrationService: UserRegistrationService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * on submit register account type
   */
  public onSubmit(): void {
    if (this.accountFormGroup.valid) {
      localStorage.clear();
      this.userRegistrationService.unmatched = null;
      this.commonUtilService.navigate(this.accountFormGroup.value.accountType === this.accountTypes.unmatched ? '/user-registration/signup' : '/guru-registration/register');
    }
  }

  public onlyTextClickable(event): void {
    if (event.target.className === event.currentTarget.className) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * build register account type form group
   */
  private buildForm(): void {
    this.accountFormGroup = this.fb.group({
      accountType: new FormControl<string>(this.accountTypes.unmatched, [Validators.required]),
      acceptTerms: new FormControl<boolean>(false, [Validators.requiredTrue]),
    });
  }
}
