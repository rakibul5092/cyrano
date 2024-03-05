import { moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapCircle } from '@angular/google-maps';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-utils.service';

import { AlertTypes } from 'src/app/lookups/app.lookups';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';
import { AlertService } from 'src/app/services/alert.service';
import { CIRCLE_OPTIONS, MAP_CIRCLE_RADIUS_KMS, MAP_OPTIONS, MAP_ZOOM_POSITION, MARKER_OPTIONS, MARKER_OPTIONS_UNMATCHER } from './map.config';
import { MapService } from './map.service';
import { MapMarkerModel } from './models/map.marker.model';
import { PositionModel } from './models/position.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @Input() markers: MapMarkerModel[] = [];
  @Input() initialLocation: PositionModel;
  @Input() mapType: google.maps.MapTypeId | undefined;
  @Input() showSearchBar: boolean = false;
  @Input() locations: any[] = [];
  @Input() loadLocations: boolean = true;
  @Input() footerState: boolean = true;
  @Output() mapLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() markerClick: EventEmitter<MapMarkerModel> = new EventEmitter<MapMarkerModel>();
  public mapOptions: google.maps.MapOptions = MAP_OPTIONS;
  public markerOptions: google.maps.MarkerOptions = MARKER_OPTIONS;
  public circleOptions: google.maps.CircleOptions = CIRCLE_OPTIONS;
  public apiLoaded: boolean = false;
  public editLocationIndex: number = null;
  public deleteLocationIndex: number = null;
  public icons: any;
  public locationTrack: PositionModel;
  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  private centerPosition: google.maps.LatLngLiteral;
  private subject: Subject<{ index: number; circle: MapCircle }> = new Subject();
  public sub = new Subscription();
  public zoom: number = MAP_OPTIONS.zoom;

  constructor(
    private mapService: MapService,
    private readonly alertService: AlertService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public commonUtilService: CommonUtilService,
    public headerService: HeaderService,
  ) {
    this.icons = this.commonUtilService.icons;
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const id = idAttr?.nodeValue;
    if (id != 'deleteItemMapSpan' && id != 'deleteItemMapIcon') {
      this.deleteLocationIndex = null;
    }
  }

  public initAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.onPlaceChange(autocomplete.getPlace());
      });
    });
  }

  private onPlaceChange(place: google.maps.places.PlaceResult): void {
    const position = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    this.initialLocation = position;
    this.centerPosition = position;
    this.initializeMapConfig();
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.loadMap();
    this.sub.add(
      this.subject.pipe(debounceTime(20)).subscribe((results) => {
        this.markerDragEndCircle(results.index, results.circle);
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * load & initialize the map
   *
   * @private
   */
  private loadMap(): void {
    if (!this.apiLoaded) {
      this.mapService.loadGoogleApis().subscribe((success) => {
        if (!success) {
          this.alertService.alert('MAP.LOADING_ERROR_TITLE', 'MAP.LOADING_ERROR', AlertTypes.error);
        }
        this.initializeMapConfig();
        this.apiLoaded = success;
        this.mapLoaded.emit(this.apiLoaded);
      });
    } else {
      this.initializeMapConfig();
      this.mapLoaded.emit(this.apiLoaded);
    }
  }

  public zoomChanged(maps): void {
    this.zoom = null;
    this.centerPosition = {
      lat: maps.getCenter().lat() + MAP_ZOOM_POSITION[this.map.getZoom()],
      lng: maps.getCenter().lng(),
    };
  }

  /**
   * configure the map
   *
   * @private
   */
  private initializeMapConfig(): void {
    if (this.showSearchBar) this.markerOptions = MARKER_OPTIONS_UNMATCHER;
    if (!this.initialLocation) {
      this.mapService.getCurrentLocation((position) => {
        this.initialLocation = position;
        this.mapOptions.center = position;
      });
    } else {
      this.mapOptions.center = this.initialLocation;
    }
    const zoomScale = this.map ? this.map.getZoom() : MAP_OPTIONS.zoom;
    this.centerPosition = this.initialLocation;
    this.locationTrack = this.initialLocation;
    this.initialLocation = { lat: this.initialLocation.lat - MAP_ZOOM_POSITION[zoomScale], lng: this.initialLocation.lng };
    this.markerOptions.animation = google.maps.Animation.DROP;
  }

  public editItem(index: number): void {
    this.zoom = MAP_OPTIONS.zoom;
    this.cdr.detectChanges();
    this.markerOptions.animation = null;
    this.resetEditMarker();
    this.markers[index] = this.mapService.buildMapMarker(
      (index + 1).toString(),
      '/assets/images/maps-count/' + (index + 1) + '.png',
      this.markers[index].position,
      this.markers[index].radius,
      '#custom_pin_maps_selected',
    );
    this.deleteLocationIndex = null;
    this.searchElementRef.nativeElement.value = this.locations[index];
    this.editLocationIndex = index;
    this.initialLocation = {
      lat: this.markers[index].position.lat - MAP_ZOOM_POSITION[MAP_OPTIONS.zoom],
      lng: this.markers[index].position.lng,
    };
    this.centerPosition = this.markers[index].position;
    this.mapOptions.center = this.markers[index].position;
    this.locationTrack = this.markers[index].position;
    this.cdr.detectChanges();
    this.markerOptions.animation = google.maps.Animation.DROP;
  }

  public deleteItem(index: number): void {
    if (this.markers.length == 1) {
      this.alertService.alert('MAP.UNABLE_TO_DELETE', 'MAP.CANNOT_DELETE_SINGLE_LOCATION', AlertTypes.error);
    } else if (this.markers.length > 1) {
      if (this.deleteLocationIndex !== null && this.deleteLocationIndex == index) {
        this.locations.splice(index, 1);
        this.markers.splice(index, 1);
        this.markers = this.markers.map((x, i) =>
          this.mapService.buildMapMarker((i + 1).toString(), '/assets/images/maps-count/' + (i + 1) + '.png', x.position, x.radius, '#custom_pin_maps'),
        );
        this.alertService.alert('MAP.LOCATION_DELETED', 'MAP.DESIREDLOCATION_IS_REMOVED', AlertTypes.success);
        this.deleteLocationIndex = null;
      } else {
        this.deleteLocationIndex = index;
      }
    }
    this.resetEditMarker();
    this.editLocationIndex = null;
    this.searchElementRef.nativeElement.value = '';
  }

  public addLocation(): void {
    if (this.checkLocationNotExists(this.centerPosition)) return;
    if (this.markers.length < 5) {
      const index = (1).toString();
      const newLocation = this.mapService.buildMapMarker(index, '/assets/images/maps-count/' + index + '.png', this.centerPosition, MAP_CIRCLE_RADIUS_KMS, '#custom_pin_maps');
      this.mapService.getAddress(this.centerPosition).subscribe((address) => {
        this.markers.unshift(newLocation);
        this.locations.unshift(address);
        this.markers = this.markers.map((x, i) =>
          this.mapService.buildMapMarker((i + 1).toString(), '/assets/images/maps-count/' + (i + 1) + '.png', x.position, x.radius, '#custom_pin_maps'),
        );
        this.searchElementRef.nativeElement.value = '';
        this.deleteLocationIndex = null;
        this.cdr.detectChanges();
        this.alertService.alert('MAP.LOCATION_ADDED', 'MAP.LOCATION_ADDED_SUCCESSFULLY', AlertTypes.success);
      });
    } else {
      this.alertService.alert('MAP.LIMIT_REACHED_ERROR', 'MAP.YOU_CAN_ADD_UPTO_FIVE_LOCATIONS', AlertTypes.error);
    }
  }

  public updateLocation(): void {
    if (this.checkLocationNotExists(this.locationTrack, this.editLocationIndex)) return;
    this.mapService.getAddress(this.locationTrack).subscribe((address) => {
      this.resetEditMarker();
      this.markers[this.editLocationIndex].position = this.locationTrack;
      this.locations[this.editLocationIndex] = address;
      this.editLocationIndex = null;
      this.deleteLocationIndex = null;
      this.searchElementRef.nativeElement.value = '';
      this.cdr.detectChanges();
    });
  }

  public centerChanged(maps: GoogleMap): void {
    this.zoom = null;
    this.centerPosition = {
      lat: maps.getCenter().lat() + MAP_ZOOM_POSITION[this.map.getZoom()],
      lng: maps.getCenter().lng(),
    };
  }

  public radiusChanged(circle: MapCircle, index: number): void {
    this.markers[index].radius = circle.getRadius();
    if (circle && circle.getRadius() > MAP_CIRCLE_RADIUS_KMS) {
      circle.radius = MAP_CIRCLE_RADIUS_KMS;
      this.markers[index].radius = MAP_CIRCLE_RADIUS_KMS;
    }
    if (circle && circle.getRadius() < 20000) {
      circle.radius = 20000;
      this.markers[index].radius = 20000;
    }
  }

  public markerDragEnd(index: number, $event: google.maps.MapMouseEvent): void {
    if (this.showSearchBar) {
      this.resetEditMarker();
      this.editLocationIndex = null;
      this.deleteLocationIndex = null;
      this.searchElementRef.nativeElement.value = '';
      this.markers[index].position = {
        lat: $event.latLng.lat(),
        lng: $event.latLng.lng(),
      };
      this.mapService.getAddress(this.markers[index].position).subscribe((address) => {
        this.locations[index] = address;
        this.cdr.detectChanges();
      });
    }
  }

  public debounceCenterchanged(index: number, circle: MapCircle): void {
    this.subject.next({
      index,
      circle,
    });
  }

  public markerDragEndCircle(index: number, circle: MapCircle): void {
    const coords: google.maps.LatLngLiteral = {
      lat: circle.getCenter().lat(),
      lng: circle.getCenter().lng(),
    };
    if (this.showSearchBar && (coords.lat !== this.markers[index].position.lat || coords.lng !== this.markers[index].position.lng)) {
      this.resetEditMarker();
      this.editLocationIndex = null;
      this.deleteLocationIndex = null;
      this.searchElementRef.nativeElement.value = '';
      this.markers[index].position = coords;
      this.cdr.detectChanges();
      this.mapService.getAddress(this.markers[index].position).subscribe((address) => {
        this.locations[index] = address;
        this.cdr.detectChanges();
      });
    }
  }

  public checkLocationNotExists(obj: google.maps.LatLngLiteral, ignoreIndex: number = -1): boolean {
    const found = this.markers.some((el, index) => el.position.lat === obj.lat && el.position.lng === obj.lng && ignoreIndex !== index);
    if (found) {
      this.alertService.alert('MAP.LOCATION_ALREADY_ADDED_TITLE', 'MAP.LOCATION_ALREADY_ADDED', AlertTypes.error);
      return true;
    }
    return false;
  }

  public drop(event: any): void {
    moveItemInArray(this.markers, event.previousIndex, event.currentIndex);
    this.markers = this.markers.map((x, i) =>
      this.mapService.buildMapMarker((i + 1).toString(), '/assets/images/maps-count/' + (i + 1) + '.png', x.position, x.radius, '#custom_pin_maps'),
    );
    moveItemInArray(this.locations, event.previousIndex, event.currentIndex);
  }

  public mousedown(event): void {
    event.stopPropagation();
  }

  public resetEditMarker(): void {
    if (this.editLocationIndex !== null) {
      this.markers[this.editLocationIndex] = this.mapService.buildMapMarker(
        (this.editLocationIndex + 1).toString(),
        '/assets/images/maps-count/' + (this.editLocationIndex + 1) + '.png',
        this.markers[this.editLocationIndex].position,
        this.markers[this.editLocationIndex].radius,
        '#custom_pin_maps',
      );
    }
  }
}
