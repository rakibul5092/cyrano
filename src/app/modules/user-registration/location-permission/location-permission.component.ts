import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { AlertTypes } from 'src/app/lookups/app.lookups';
import { APPLICATION_ERRORS } from 'src/app/lookups/error.codes.lookup';
import { AlertService } from 'src/app/services/alert.service';
import { CacheKeys, CacheService } from 'src/app/services/cache-service.service';
import { ExceptionsService } from 'src/app/services/exceptions.service';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';
import { SnackbarComponentEnableLocation } from './snack-bar-enable-location/snack-bar-enable-location.component';

@Component({
  selector: 'app-location-permission',
  templateUrl: './location-permission.component.html',
  styleUrls: ['./location-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPermissionComponent implements OnInit {
  private lat: number;
  private long: number;
  locationEnabled = false;
  /**
   * @param userRegistrationService
   * @param exceptionsService
   * @param alertService
   * @param utilService
   * @param cdr
   */
  constructor(
    private userRegistrationService: UserRegistrationService,
    private exceptionsService: ExceptionsService,
    private alertService: AlertService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private cacheService: CacheService,
  ) {}

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(12.5);
  }

  async ngOnInit(): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      const coords = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      this.lat = coords.coords.latitude;
      this.long = coords.coords.longitude;
      this.updateLocationEnabled();
    } else {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition((data) => {
            this.lat = data.coords.latitude;
            this.long = data.coords.longitude;
            this.updateLocationEnabled();
          });
        }
        result.addEventListener('change', (event: any) => {
          if (event.currentTarget.state === 'granted') {
            navigator.geolocation.getCurrentPosition((data) => {
              this.lat = data.coords.latitude;
              this.long = data.coords.longitude;
              this.updateLocationEnabled();
              this.alertService.alert('LOCATION.TITLE', 'LOCATION.ENABLED', AlertTypes.success);
            });
          } else if (event.currentTarget.state === 'denied') {
            this.disableLocation();
          }
        });
      });
    }
  }

  /**
   * On request location permisson for mobile devices
   */
  public async onRequestLocationPermission(): Promise<void> {
    if (Capacitor.getPlatform() !== 'web') {
      Geolocation.requestPermissions()
        .then(async (data) => {
          try {
            const coords = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
            this.lat = coords.coords.latitude;
            this.long = coords.coords.longitude;
            await this.alertService.alert('LOCATION.TITLE', 'LOCATION.ENABLED', AlertTypes.success);
            this.updateLocationEnabled();
          } catch (err) {
            this.openSnackbarEnableLocation();
            this.updateLocationEnabled();
          }
        })
        .catch((error) => {
          this.openSnackbarEnableLocation();
          this.updateLocationEnabled();
        });
    } else {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            (data) => {
              this.lat = data.coords.latitude;
              this.long = data.coords.longitude;
              this.updateLocationEnabled();
              this.alertService.alert('LOCATION.TITLE', 'LOCATION.ENABLED', AlertTypes.success);
            },
            (error) => {
              if (error.PERMISSION_DENIED) {
                this.openSnackbarEnableLocation();
                this.updateLocationEnabled();
              }
            },
          );
        } else if (result.state === 'denied') {
          this.openSnackbarEnableLocation();
          this.updateLocationEnabled();
        }
      });
    }
  }

  /**
   * Continue to next component
   */
  public onContinue(): void {
    if (this.lat && this.long && this.locationEnabled) {
      this.userRegistrationService
        .update({
          ...this.userRegistrationService.unmatched,
          location: {
            lat: this.lat,
            long: this.long,
          },
        })
        .subscribe({
          next: (value) => {
            this.navigateTo();
          },
          error: async (error) => {
            await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.SERVER_ERROR]);
          },
        });
    }
  }

  public navigateTo(): void {
    this.cacheService.saveLocalStorage(CacheKeys.skipLocation, 'false');
    this.userRegistrationService.skipLocation = false;
    this.userRegistrationService.routeToNextPage({}, 'maps').subscribe();
  }

  public disableLocation(): void {
    this.lat = null;
    this.long = null;
    this.locationEnabled = false;
    this.alertService.alert('LOCATION.TITLE', 'LOCATION.DISABLED', AlertTypes.error);
    this.cdr.markForCheck();
  }

  public updateLocationEnabled(): void {
    this.locationEnabled = this.lat !== null && this.long !== null;
    this.cdr.markForCheck();
  }

  public openSnackbarEnableLocation(): void {
    this.snackBar.openFromComponent(SnackbarComponentEnableLocation, {
      panelClass: 'wrapper-location-bar',
      duration: 0,
    });
  }
}
