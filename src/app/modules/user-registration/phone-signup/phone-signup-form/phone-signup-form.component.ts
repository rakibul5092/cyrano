import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { APPLICATION_ERRORS } from 'src/app/lookups/error.codes.lookup';
import { AlertService } from 'src/app/services/alert.service';
import { ExceptionsService } from 'src/app/services/exceptions.service';
import { HeaderService } from '../../layout/header/header.service';
import { Unmatched } from '../../models/unmatched.model';
import { UserRegistrationService } from '../../services/user-registration.service';
import { ChangeData } from 'nextsapien-component-lib';

@Component({
  selector: 'app-phone-signup-form',
  templateUrl: './phone-signup-form.component.html',
  styleUrls: ['./phone-signup-form.component.scss'],
})
export class PhoneSignupFormComponent implements OnInit {
  @Input() nextPath: string;
  @Input() defaultValue: string = '';
  public signupForm: FormGroup<{
    phone: FormControl<ChangeData>;
  }>;
  public loading$ = this.userRegistrationService.loading;

  /**
   * @param formBuilder
   * @param navController
   * @param userRegistrationService
   * @param exceptionsService
   * @param headerService
   */
  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private userRegistrationService: UserRegistrationService,
    private exceptionsService: ExceptionsService,
    private headerService: HeaderService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {}

  /***/
  ngOnInit(): void {
    this.buildForm();

    // Add arrow icon to country code selection button
    this.initIcon();
    this.headerService.congratulations$.next(false);
  }

  /**
   * Continue to next component
   */
  public navigateToVerify(): void {
    let internationalPhoneNumber = this.signupForm.controls.phone.value.e164Number ?? this.signupForm.controls.phone.value.internationalNumber;

    if (!internationalPhoneNumber.includes('+')) {
      internationalPhoneNumber = `+${internationalPhoneNumber}`;
    }

    if (this.signupForm.valid) {
      this.userRegistrationService.createUnmatchedUser(internationalPhoneNumber).subscribe({
        next: (res: Unmatched) => {
          if (!res.verified) {
            this.navController.navigateForward(this.nextPath, { animated: true, animationDirection: 'forward' });
          } else {
            this.userRegistrationService.routeToNextPage({}, 'location').subscribe();
          }
        },
        error: async (error) => {
          if (error && error?.error?.data?.statusCode === APPLICATION_ERRORS.PHONE_NUMBER_EXISTS.statusCode) {
            this.translateService.get('UNMATCHED_USER.LOGIN').subscribe((buttonName: string) => {
              this.alertService.alertException(APPLICATION_ERRORS.PHONE_NUMBER_EXISTS, true, buttonName, () => {
                this.navigateToLoginPage(internationalPhoneNumber);
              });
            });
            return;
          }
          this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.SERVER_ERROR]);
        },
      });
    }
  }

  public navigateToLoginPage(phone: string): void {
    if (!phone) return;
    this.userRegistrationService.prefilledUsername = phone;
    this.navController.navigateForward('auth', { animated: true, animationDirection: 'forward' });
  }

  /**
   * Building form
   */
  private buildForm(): void {
    this.signupForm = this.formBuilder.group({
      phone: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Configuring custiom arrow icon on country code dropdown
   */
  private initIcon(): void {
    const buttonWrapper = document.getElementsByClassName('mat-button-wrapper')[0] as HTMLSpanElement;
    if (buttonWrapper) {
      const img: HTMLImageElement = document.createElement('img');
      img.src = 'assets/icon/unmatched-registration/down-arrow.svg';
      img.style.width = '10px';
      img.style.height = '7.11px';

      /**
       * This is not a correct way to load an image for first element of a class 'mat-button-wrapper'.
       * Due to this, down arrow is being loaded on a login page.
       * Currently I am commenting this, to avoid that issue
       */

      // buttonWrapper.appendChild(img);

      /* Developer's comment ends */

      buttonWrapper.style.display = 'flex';
      buttonWrapper.style.justifyContent = 'center';
      buttonWrapper.style.alignItems = 'center';
      buttonWrapper.style.gap = '4px';
    }
  }
}
