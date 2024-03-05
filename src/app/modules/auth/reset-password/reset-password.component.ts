import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AUTH_APIS } from '../../../lookups/api.lookups';
import { APPLICATION_ERRORS } from '../../../lookups/error.codes.lookup';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { ChangeDetectorService } from '../../../services/change-detector';
import { CommonUtilService } from '../../../services/common-utils.service';
import { ExceptionsService } from '../../../services/exceptions.service';
import { HttpUtilService } from '../../../services/http-utils.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  public hide: boolean = true;
  public confirmPasswordHide: boolean = true;
  public loading: boolean;
  public resetPasswordForm: FormGroup;

  constructor(
    public commonUtilService: CommonUtilService,
    private httpUtilService: HttpUtilService,
    private cacheService: CacheService,
    private exceptionsService: ExceptionsService,
    private changeDetectorService: ChangeDetectorService,
    private fb: FormBuilder,
  ) {}

  get resetForm(): any {
    return this.resetPasswordForm.controls;
  }

  get password(): any {
    return this.resetPasswordForm.controls.password;
  }

  ionViewWillEnter(): void {
    this.buildForm();
  }

  ionViewWillLeave(): void {
    this.resetPasswordForm = null;
  }

  /**
   * submit reset password
   */
  public onSubmit(): void {
    if (this.resetPasswordForm.valid && !this.loading) {
      this.loading = true;
      const userEmail = this.cacheService.getSessionData(CacheKeys.userEmail);
      this.httpUtilService
        .postRequest(AUTH_APIS.password.reset, { password: this.resetPasswordForm.value.password, email: userEmail })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          (response) => {
            this.cacheService.cacheUserData(response.user, response.access_token);
            this.changeDetectorService.emitUserInfo(response.user);
            this.commonUtilService.navigate('../home');
          },
          async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.NOT_VALID_PASSWORD, APPLICATION_ERRORS.OLD_PASSWORD]);
          },
        );
    } else {
      this.resetPasswordForm.markAsTouched();
    }
  }

  /**
   * build reset password form
   */
  private buildForm(): void {
    this.resetPasswordForm = this.fb.group({
      password: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    });
  }
}
