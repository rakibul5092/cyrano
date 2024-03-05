import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';
import { AlertTypes } from 'src/app/lookups/app.lookups';
import { APPLICATION_ERRORS } from 'src/app/lookups/error.codes.lookup';
import { AlertService } from 'src/app/services/alert.service';
import { CacheKeys, CacheService } from 'src/app/services/cache-service.service';
import { ExceptionsService } from 'src/app/services/exceptions.service';
import { HeaderService } from '../../layout/header/header.service';
import { UserRegistrationService } from '../../services/user-registration.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  @Input() defaultValue: string = '';
  @Input() phoneNumber: string = '';
  @Input() nextPath = '/user-registration/location-permission';
  public otpCode: FormControl;
  public alreadyVerified: boolean = false;
  public secondsLeft = 30;
  public loading$ = this.userRegistrationService.loading;
  private progress = 6.25;

  /**
   * @param navController
   */
  constructor(
    private navController: NavController,
    private userRegistrationService: UserRegistrationService,
    private exceptionsService: ExceptionsService,
    private alertService: AlertService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef,
    private cacheService: CacheService,
  ) {}

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(this.progress);
    this.userRegistrationService.skipLocation = false;
  }

  /***/
  ngOnInit(): void {
    this.otpCode = new FormControl(null, [Validators.required, Validators.minLength(5)]);

    if (this.defaultValue?.length === 5) {
      this.otpCode.setValue(this.defaultValue, { emitEvent: false });
      this.alreadyVerified = true;
    } else {
      this.startCount();
    }
    this.phoneNumber = this.userRegistrationService.unmatched?.phoneNumber;
  }

  /**
   * Resend button click event
   */
  public onResend(): void {
    if (this.alreadyVerified) return;
    this.userRegistrationService.resendOTP().subscribe({
      next: (smsRes) => {
        this.secondsLeft = 30;
        this.startCount();
      },
      error: (error) => {
        this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.SERVER_ERROR]);
      },
    });
  }

  /**
   * On confirm verification code
   */
  public confirm(): void {
    if (this.otpCode.valid) {
      this.userRegistrationService.verifyOTP(this.userRegistrationService.unmatched.phoneNumber, this.otpCode.value).subscribe({
        next: async (res) => {
          if (res?.phoneNumber) {
            this.onRequestLocationPermission();
            return;
          }
          if (!res?.status && res.code.message === 'OTP expired') {
            // code for OTP expired
            await this.alertService.alert('OTP.TITLE', 'OTP.EXPIRED', AlertTypes.error);
          }
          if (!res?.status && res.code.message === 'OTP not valid') {
            // code for invalid OTP
            await this.alertService.alert('OTP.TITLE', 'OTP.INVALID', AlertTypes.error);
          }
        },
        error: async (error) => {
          await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.BAD_REQUEST]);
        },
      });
    }
  }

  public onEdit(): void {
    this.userRegistrationService.routeBackinRegistrationFlow();
  }

  /**
   * Start countring resend timer
   */
  private startCount(): void {
    // counting seconds
    const downloadTimer = setInterval(() => {
      if (this.secondsLeft === 0) {
        clearInterval(downloadTimer);
      } else {
        this.secondsLeft -= 1;
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  /**
   * On request location permisson
   */
  public async onRequestLocationPermission(): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      Geolocation.requestPermissions()
        .then(async (data) => {
          try {
            const coords = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
            const lat = coords.coords.latitude;
            const long = coords.coords.longitude;
            this.updateLocation(lat, long);
          } catch (err) {
            this.navigateTo(false);
          }
        })
        .catch((error) => {
          this.navigateTo(false);
        });
    } else {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (data) => {
              const lat = data.coords.latitude;
              const long = data.coords.longitude;
              this.updateLocation(lat, long);
            },
            (error) => {
              if (error.PERMISSION_DENIED) {
                this.navigateTo(false);
              }
            },
          );
        } else if (result.state === 'denied') {
          this.navigateTo(false);
        }
      });
    }
  }

  /**
   * Update Location
   */
  public updateLocation(lat, long): void {
    if (lat && long) {
      this.userRegistrationService
        .update({
          ...this.userRegistrationService.unmatched,
          location: {
            lat,
            long,
          },
        })
        .subscribe({
          next: (value) => {
            this.navigateTo(true);
          },
          error: async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.SERVER_ERROR]);
          },
        });
    } else {
      this.navigateTo(false);
    }
  }

  public navigateTo(skipEnableLocation): void {
    if (skipEnableLocation) {
      this.cacheService.saveLocalStorage(CacheKeys.skipLocation, 'true');
      this.userRegistrationService.skipLocation = true;
      this.userRegistrationService.routeToNextPage({}, 'maps').subscribe();
    } else {
      this.cacheService.saveLocalStorage(CacheKeys.skipLocation, 'false');
      this.userRegistrationService.skipLocation = false;
      this.navController.navigateForward(this.nextPath, { animated: true, animationDirection: 'forward' });
    }
  }
}
