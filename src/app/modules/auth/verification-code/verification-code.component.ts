import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpUtilService } from 'src/app/services/http-utils.service';
import { AUTH_APIS } from '../../../lookups/api.lookups';
import { AlertTypes } from '../../../lookups/app.lookups';
import { APPLICATION_ERRORS } from '../../../lookups/error.codes.lookup';
import { AlertService } from '../../../services/alert.service';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { CommonUtilService } from '../../../services/common-utils.service';
import { ExceptionsService } from '../../../services/exceptions.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
})
export class VerificationCodeComponent {
  public loading: boolean;
  public userEmail: string;
  public code: FormControl = new FormControl<any>('', [Validators.required, Validators.minLength(4)]);
  public resendInfo: { retriesMax: number; retries: number };

  constructor(
    public commonUtilService: CommonUtilService,
    private cacheService: CacheService,
    private alertService: AlertService,
    private exceptionsService: ExceptionsService,
    private httpUtilService: HttpUtilService,
  ) {
    this.userEmail = this.cacheService.getSessionData(CacheKeys.userEmail);
  }

  public onSubmit(): void {
    if (this.code.valid && !this.loading) {
      this.loading = true;
      this.httpUtilService
        .postRequest(AUTH_APIS.password.verify, { code: this.code.value, email: this.userEmail })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          () => {
            this.alertService.alert('AUTH.VERIFY_EMAIL', 'AUTH.VERIFY_EMAIL_SUCCESS', AlertTypes.success);
            this.commonUtilService.navigate('../password/reset');
          },
          async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.INVALID_CODE]);
          },
        );
    } else {
      this.code.markAsTouched();
    }
  }

  public reSendVerificationCode(): void {
    if (!this.loading) {
      this.loading = true;
      this.code.reset();
      this.httpUtilService
        .postRequest(AUTH_APIS.password.forgot, { email: this.userEmail })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          (response) => {
            this.alertService.alert('AUTH.VERIFY_EMAIL', 'AUTH.VERIFY_EMAIL_RESEND_SUCCESS', AlertTypes.success);
            this.resendInfo = response?.data;
          },
          async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.VERIFY_EMAIL_RESEND_MAX_RETRIES_ERROR]);
          },
        );
    } else {
      this.code.markAsTouched();
    }
  }
}
