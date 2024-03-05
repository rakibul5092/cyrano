import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MAP_CIRCLE_RADIUS_KMS } from './map.config';
import { MapMarkerModel } from './models/map.marker.model';
import { PositionCallback, PositionModel } from './models/position.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public apiLoaded = false;
  constructor(private httpClient: HttpClient) {}

  /**
   * load Google Apis script
   */
  public loadGoogleApis(): Observable<boolean> {
    if (!this.apiLoaded) {
      return this.httpClient.jsonp(environment.googleMapsURL + '?key=' + environment.googleMapsKey + '&libraries=places,visualization', 'callback').pipe(
        map(() => {
          this.apiLoaded = true;
          return true;
        }),
        catchError(() => of(false)),
      );
    } else return of(true);
  }

  /**
   * build map marker object
   *
   * @param id
   * @param icon
   * @param position
   * @param iconSize
   */
  public buildMapMarker(
    id: string,
    icon: string,
    position: PositionModel,
    radius: number = MAP_CIRCLE_RADIUS_KMS,
    customClass: string = '#custom_marker',
    iconSize: number = 70,
  ): MapMarkerModel {
    return {
      id,
      position,
      radius,
      icon: {
        url: icon + customClass,
        size: new google.maps.Size(iconSize, iconSize),
        scaledSize: new google.maps.Size(iconSize, iconSize),
      },
    };
  }

  /**
   * get current user location
   */
  public getCurrentLocation(positionCallback: PositionCallback, errorCallback: PositionCallback = null): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          positionCallback({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (positionError) => {
          errorCallback(null);
        },
      );
    } else {
      errorCallback(null);
    }
  }

  public getAddress(location: google.maps.LatLngLiteral): Observable<any> {
    const geocoder = new google.maps.Geocoder();
    return from(geocoder.geocode({ location })).pipe(
      map(({ results }) => {
        const addressComponents = results[0]?.address_components;
        const streetNumber = addressComponents?.find((component) => component.types.includes('street_number'))?.long_name;
        const streetName = addressComponents?.find((component) => component.types.includes('route'))?.long_name;
        const city = addressComponents?.find((component) => component.types.includes('locality'))?.long_name;
        const state = addressComponents?.find((component) => component.types.includes('administrative_area_level_1'))?.long_name;
        const country = addressComponents?.find((component) => component.types.includes('country'))?.long_name;
        const address: string = `${streetNumber ? streetNumber + ', ' : ''}${streetName ? streetName + ', ' : ''} ${city ? city + ', ' : ''} ${state ? state + ', ' : ''} ${
          country ? country : ''
        }`;
        return address.match(/[a-zA-Z0-9]+/g) ? address : results[0]?.formatted_address;
      }),
    );
  }
}
