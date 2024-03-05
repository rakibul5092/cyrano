import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AUTH_APIS } from '../../../lookups/api.lookups';
import { AlertTypes } from '../../../lookups/app.lookups';
import { AlertService } from '../../../services/alert.service';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { CommonUtilService } from '../../../services/common-utils.service';
import { HttpUtilService } from '../../../services/http-utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public loading: boolean;
  public forgotPasswordFormGroup: UntypedFormGroup;

  constructor(
    public commonUtilService: CommonUtilService,
    private fb: UntypedFormBuilder,
    private cacheService: CacheService,
    private alertService: AlertService,
    private httpUtilService: HttpUtilService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get email(): any {
    return this.forgotPasswordFormGroup.controls.email;
  }

  ionViewWillLeave(): void {
    this.forgotPasswordFormGroup = null;
  }

  /**
   * submit forgot password form
   */
  public onSubmit(): void {
    if (this.forgotPasswordFormGroup.valid && !this.loading) {
      this.loading = true;
      this.httpUtilService
        .postRequest(AUTH_APIS.password.forgot, { email: this.forgotPasswordFormGroup.value.email })
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          () => {
            this.alertService.alert('AUTH.FORGOT_PASSWORD', 'AUTH.SENT_VERIFICATION_CODE_SUCCESS', AlertTypes.success);
            this.cacheService.setSessionData(CacheKeys.userEmail, this.forgotPasswordFormGroup.value.email);
            this.commonUtilService.navigate('../password/verify');
          },
          async () => {
            await this.alertService.alert('AUTH.FORGOT_PASSWORD', 'AUTH.SENT_VERIFICATION_CODE_ERROR', AlertTypes.error);
          },
        );
    }
  }

  /**
   * build login form group
   */
  private buildForm(): void {
    this.forgotPasswordFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
