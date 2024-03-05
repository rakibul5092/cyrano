import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { PATTERNS } from 'src/app/constants/patterns.constants';

import { AUTH_APIS } from '../../../lookups/api.lookups';
import { APPLICATION_ERRORS } from '../../../lookups/error.codes.lookup';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { ChangeDetectorService } from '../../../services/change-detector';
import { CommonUtilService } from '../../../services/common-utils.service';
import { ExceptionsService } from '../../../services/exceptions.service';
import { HttpUtilService } from '../../../services/http-utils.service';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public hide = true;
  public loading: boolean;
  public loginFormGroup: UntypedFormGroup;

  /***/
  constructor(
    private fb: UntypedFormBuilder,
    private cacheService: CacheService,
    private changeDetectorService: ChangeDetectorService,
    public commonUtilService: CommonUtilService,
    private httpUtilService: HttpUtilService,
    private exceptionsService: ExceptionsService,
    private userRegistrationService: UserRegistrationService,
    private route: ActivatedRoute,
  ) {}

  ionViewWillEnter(): void {
    this.cacheService.clearSession();
    this.changeDetectorService.emitUserInfo(null);
    this.buildForm();
  }

  ionViewWillLeave(): void {
    this.loginFormGroup = null;
  }

  /**
   * on submit login
   */
  onSubmit(): void {
    if (this.loginFormGroup.valid && !this.loading) {
      this.loading = true;
      this.httpUtilService
        .postRequest(AUTH_APIS.login, this.loginFormGroup.value)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe(
          (response: any) => {
            this.cacheService.saveLocalStorage(CacheKeys.rememberMe, this.loginFormGroup.get('remember').value);
            this.cacheService.cacheUserData(response.user, response.access_token, this.loginFormGroup.get('remember').value);
            if (response.user?.unmatched) {
              this.userRegistrationService.updateLocalEntity(response.user?.unmatched);
              this.commonUtilService.navigate('user-registration');
            } else {
              this.commonUtilService.navigate('home');
              this.changeDetectorService.emitUserInfo(response.user);
            }

            this.prePopulateUsername(this.loginFormGroup.get('username').value);
          },
          async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.LOGIN_NOT_VALID]);
          },
        );
    } else {
      this.loginFormGroup.markAllAsTouched();
    }
  }

  /**
   * build login form group
   */
  private buildForm(): void {
    this.loginFormGroup = this.fb.group({
      username: new UntypedFormControl('', [Validators.required, Validators.pattern(PATTERNS.USERNAME)]),
      password: new UntypedFormControl('', [Validators.required]),
      remember: new UntypedFormControl(false),
    });

    if (this.userRegistrationService.prefilledUsername) this.loginFormGroup.patchValue({ username: this.userRegistrationService.prefilledUsername });
  }

  /**
   * Sets the username value
   *
   * @param value Username value that will be prefilled
   */
  private prePopulateUsername(value: string): void {
    this.userRegistrationService.prefilledUsername = value;
  }
}
