import { Component, Input } from '@angular/core';
import { ChangeDetectorService } from 'src/app/services/change-detector';
import { AUTH_APIS } from '../../../lookups/api.lookups';
import { AlertTypes } from '../../../lookups/app.lookups';
import { AlertService } from '../../../services/alert.service';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { CommonUtilService } from '../../../services/common-utils.service';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';

@Component({
  selector: 'app-auth-social',
  templateUrl: './auth-social.component.html',
  styleUrls: ['./auth-social.component.scss'],
})
export class AuthSocialComponent {
  @Input() remember = false;
  socialWindow: any;

  /***/
  constructor(
    public commonUtilService: CommonUtilService,
    private cacheService: CacheService,
    private alertService: AlertService,
    private changeDetectorService: ChangeDetectorService,
    private userRegistrationService: UserRegistrationService,
  ) {}

  /**
   * on social login/register
   *
   * @param provider [google, facebook, Twitter ]
   */
  socialLogin(provider): void {
    if (this.socialWindow) {
      this.socialWindow.close();
    }
    const ref = this;
    this.socialWindow = window.open(AUTH_APIS[provider], '', `location=1,status=1,scrollbars=1, width=800,height=800`);
    window.addEventListener('message', (message: any) => {
      if (!message || !message.data || !message.data.user || !message.data.access_token) {
        ref.alertService.alert('Login', 'Error While Login', AlertTypes.error);
      } else {
        this.cacheService.saveLocalStorage(CacheKeys.rememberMe, this.remember);
        ref.cacheService.cacheUserData(message.data.user, message.data.access_token, this.remember);
        this.changeDetectorService.emitUserInfo(message.data.user);
        ref.commonUtilService.navigate('../home');
        this.userRegistrationService.prefilledUsername = '';
      }
    });
  }
}
