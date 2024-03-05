import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { APPLICATION_ERRORS } from 'src/app/lookups/error.codes.lookup';
import { AlertService } from 'src/app/services/alert.service';
import { UserRegistrationRoute } from '../enums/user-registration-route.enum';
import { HeaderService } from '../layout/header/header.service';
import { Unmatched } from '../models/unmatched.model';
import { UserRegistrationService } from '../services/user-registration.service';

type AccountDetailsForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
};

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailsComponent implements OnInit {
  public accountDetailsForm: FormGroup<AccountDetailsForm>;
  public passwordVisibility = false;
  public confirmPasswordVisibility = false;
  public enableContinueButton = false;
  public loading$ = this.userRegistration.loading;

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private userRegistration: UserRegistrationService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef,
    private alertService: AlertService,
    private userRegistrationService: UserRegistrationService,
    private translateService: TranslateService,
  ) {}

  /**
   * Initilize
   */
  ngOnInit(): void {
    this.buildForm();

    if (this.userRegistration.unmatched?.email) {
      this.accountDetailsForm.patchValue({
        ...this.userRegistration.unmatched,
      });
      this.enableContinueButton = true;
      this.accountDetailsForm.get('password').setValidators([]);
      this.accountDetailsForm.get('confirmPassword').setValidators([]);
      this.accountDetailsForm.get('confirmPassword').setValue(this.accountDetailsForm.get('password')?.value);
    }
    this.cdr.detectChanges();
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(25);
  }

  /**
   * Continue to next component
   */
  public onContinue(): void {
    this.userRegistration.updateAccountDetails(this.accountDetailsForm.value).subscribe({
      next: (user: Unmatched) => {
        this.navController.navigateForward(UserRegistrationRoute['birthday'], { animated: true, animationDirection: 'forward' });
      },
      error: (error) => {
        if (error && error?.error?.data?.statusCode === APPLICATION_ERRORS.EMAIL_ALREADY_EXISTS.statusCode) {
          this.translateService.get('UNMATCHED_USER.LOGIN').subscribe((buttonName: string) => {
            const email = this.accountDetailsForm.get('email').value;
            this.alertService.alertException(APPLICATION_ERRORS.EMAIL_ALREADY_EXISTS, true, buttonName, () => {
              this.navigateToLoginPage(email);
            });
          });
        }
      },
    });
  }

  public changePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
  public changeConfirmPasswordVisibility(): void {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }

  private buildForm(): void {
    this.accountDetailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  private navigateToLoginPage(email: string): void {
    if (!email) return;
    this.userRegistrationService.prefilledUsername = email;
    this.navController.navigateForward('auth', { animated: true, animationDirection: 'forward' });
  }
}
