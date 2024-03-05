import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AlertTypes } from 'src/app/lookups/app.lookups';
import { AlertService } from 'src/app/services/alert.service';
import { DateRequestModel } from '../../guru/guru-services/models/date.request.model';
import { MAP_CIRCLE_RADIUS_KMS } from '../../shared/components/map/map.config';
import { MapService } from '../../shared/components/map/map.service';
import { MapMarkerModel } from '../../shared/components/map/models/map.marker.model';
import { PositionModel } from '../../shared/components/map/models/position.model';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-maps-location',
  templateUrl: './maps-location.component.html',
  styleUrls: ['./maps-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapsLocationComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading$ = this.userRegistrationService.loading;
  public initialLocation: PositionModel;
  public requests: DateRequestModel[] = [];
  public requestsMarkers: MapMarkerModel[] = [];
  public mapType: google.maps.MapTypeId | undefined;
  public loadingLocation: boolean;
  public sub = new Subscription();
  public locations: any[] = [];
  public mapLoaded: boolean = false;
  public hideContinue: boolean = true;
  public footerState: boolean = true;
  @ViewChild('myTemplate') myTemplate: TemplatePortal<string>;
  public loadLocations: boolean = this.userRegistrationService?.unmatched?.preferredLocations?.length == 0 ? true : false;

  constructor(
    private userRegistrationService: UserRegistrationService,
    private cdRef: ChangeDetectorRef,
    private mapService: MapService,
    private headerService: HeaderService,
    private app: AppComponent,
    private readonly alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit(): void {
    this.app._portal = this.myTemplate;
  }

  ionViewWillEnter(): void {
    this.hideContinue = false;
    if (this.userRegistrationService.skipLocation) this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.CODE_VERIFICATION' });
    else this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.ENABLE_LOCATION' });
    this.cdRef.detectChanges();
  }

  ionViewWillLeave(): void {
    this.hideContinue = true;
    this.headerService.headerTitle$.next({ visible: false, title: '' });
    this.cdRef.detectChanges();
  }

  /**
   * callback after map loaded
   *
   * @param loaded
   */
  public onMapLoaded(loaded): void {
    if (loaded) {
      this.requestsMarkers =
        this.userRegistrationService?.unmatched?.preferredLocations && this.userRegistrationService?.unmatched?.preferredLocations?.length !== 0
          ? this.userRegistrationService?.unmatched?.preferredLocations?.map((x, i) => {
              const temp = {
                lat: x.lat,
                lng: x.long,
              };
              return this.mapService.buildMapMarker(i.toString(), '/assets/images/maps-count/' + (i + 1).toString() + '.png', temp, x.radius, '#custom_pin_maps');
            })
          : [this.mapService.buildMapMarker('1', '/assets/images/maps-count/1.png', this.initialLocation, MAP_CIRCLE_RADIUS_KMS, '#custom_pin_maps')];
      const locations = this.requestsMarkers.map((marker) => this.mapService.getAddress(marker.position));
      forkJoin(locations).subscribe((addresses) => {
        this.locations = addresses;
        this.mapLoaded = true;
        this.cdRef.detectChanges();
      });
      this.mapType = google.maps.MapTypeId.ROADMAP;
    }
  }

  /**
   * get user location
   */
  public getUserLocation(): void {
    this.loadingLocation = true;
    if (this.userRegistrationService?.unmatched?.preferredLocations && this.userRegistrationService?.unmatched?.preferredLocations.length !== 0) {
      const pos = this.userRegistrationService.unmatched.preferredLocations[0];
      const temp = {
        lat: pos.lat,
        lng: pos.long,
      };
      this.initialLocation = temp;
      this.cdRef.detectChanges();
      this.loadingLocation = false;
    } else {
      this.mapService.getCurrentLocation(
        (position) => {
          if (position) {
            this.initialLocation = position;
            this.cdRef.detectChanges();
            this.loadingLocation = false;
          } else {
            this.userRegistrationService.routeBackinRegistrationFlow();
          }
        },
        () => {
          this.userRegistrationService.routeBackinRegistrationFlow();
          this.alertService.alert('LOCATION.TITLE', 'LOCATION.DENIED', AlertTypes.error);
        },
      );
    }
  }

  /**
   * Continue to next component
   */
  public onContinue(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          preferredLocations: this.requestsMarkers.map((marker) => ({ lat: marker.position.lat, long: marker.position.lng, radius: marker.radius })),
        },
        'welcome',
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
