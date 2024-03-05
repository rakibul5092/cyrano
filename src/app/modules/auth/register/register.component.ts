import { Component, HostListener, Renderer2 } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AUTH_APIS } from '../../../lookups/api.lookups';
import { APPLICATION_ERRORS } from '../../../lookups/error.codes.lookup';
import { CacheService } from '../../../services/cache-service.service';
import { ChangeDetectorService } from '../../../services/change-detector';
import { CommonUtilService } from '../../../services/common-utils.service';
import { ExceptionsService } from '../../../services/exceptions.service';
import { HttpUtilService } from '../../../services/http-utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public submitted = false;
  public hide = true;
  public confirmPasswordHide = true;
  public loading: boolean;
  public registerFormGroup: UntypedFormGroup;

  public preferredCountries: string[] = ['us'];

  constructor(
    private renderer: Renderer2,
    private fb: UntypedFormBuilder,
    private cacheService: CacheService,
    private changeDetectorService: ChangeDetectorService,
    public commonUtilService: CommonUtilService,
    private httpUtilService: HttpUtilService,
    private exceptionsService: ExceptionsService,
  ) {}

  get registerForm(): any {
    return this.registerFormGroup.controls;
  }

  /**
   * wor arround to fix the ngx-mat-intl-tel-input input
   * Country Search Field becomes unfocusable issue
   *
   * @param event
   */
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    const elementExists = document.getElementsByClassName('country-search').length;
    if (elementExists) {
      const element = this.renderer?.selectRootElement('.country-search');
      const x = element as HTMLElement;
      setTimeout(() => x.focus(), 200);
    }
  }

  ionViewWillEnter(): void {
    this.buildForm();
    this.cacheService.clearSession();
    this.changeDetectorService.emitUserInfo(null);
  }

  ionViewWillLeave(): void {
    this.registerFormGroup = null;
  }

  public openCountriesDropdown(event): void {
    event.target.click();
  }

  /**
   * on submit register
   */
  public onSubmit(): void {
    this.submitted = true;
    if (this.registerFormGroup.valid && !this.loading) {
      this.loading = true;
      const request: any = { ...this.registerFormGroup.value };
      request.fullName = request.firstName + request.lastName;
      this.httpUtilService
        .postRequest(AUTH_APIS.register, request)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
        )
        .subscribe(
          (response: any) => {
            this.cacheService.cacheUserData(response.user, response.access_token);
            this.changeDetectorService.emitUserInfo(response.user);
            this.commonUtilService.navigate('../home');
          },
          async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.REGISTER_NOT_VALID_PASSWORD]);
          },
        );
    }
  }

  /**
   * build register form group
   */
  private buildForm(): void {
    this.registerFormGroup = this.fb.group({
      firstName: new UntypedFormControl('', [Validators.required]),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
      phone: new UntypedFormControl('', [Validators.required]),
      inviteCode: new UntypedFormControl('', []),
    });
  }
}
