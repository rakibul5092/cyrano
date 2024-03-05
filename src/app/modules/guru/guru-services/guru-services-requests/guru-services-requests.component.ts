import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapService } from 'src/app/modules/shared/components/map/map.service';
import { MapMarkerModel } from 'src/app/modules/shared/components/map/models/map.marker.model';
import { PositionModel } from 'src/app/modules/shared/components/map/models/position.model';
import { DateRequestModel } from '../models/date.request.model';
import { GuruServicesRequestComponent } from './guru-services-request/guru-services-request.component';
import { GuruServicesRequestsService } from './guru-services-requests.service';

@Component({
  selector: 'app-guru-services-requests',
  templateUrl: './guru-services-requests.component.html',
  styleUrls: ['./guru-services-requests.component.scss'],
})
export class GuruServicesRequestsComponent implements OnInit {
  public initialLocation: PositionModel;
  public requests: DateRequestModel[] = [];
  public requestsMarkers: MapMarkerModel[] = [];
  public mapType: google.maps.MapTypeId | undefined;
  public loadingLocation: boolean;

  constructor(private modalCtrl: ModalController, private guruServicesRequestsService: GuruServicesRequestsService, private mapService: MapService) {}

  ngOnInit(): void {
    this.getUserLocation();
  }

  /**
   * open a client request
   *
   * @param request
   */
  public async openRequest(request: DateRequestModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: GuruServicesRequestComponent,
      cssClass: 'guru-request-modal',
      componentProps: { request },
    });
    modal.present();
    await modal.onWillDismiss();
  }

  /**
   * callback after map loaded
   *
   * @param loaded
   */
  public onMapLoaded(loaded): void {
    if (loaded) {
      this.requestsMarkers = this.requests.map((request) => this.mapService.buildMapMarker(request.id, request.client.profileImage, request.position));
      this.mapType = google.maps.MapTypeId.ROADMAP;
    }
  }

  /**
   * on map marker clicked
   *
   * @param marker
   */
  public onMarkerClick(marker: MapMarkerModel): void {
    if (marker) {
      const request = this.requests.find((value) => value.id === marker.id);
      this.openRequest(request);
    }
  }

  /**
   * get user location
   */
  public getUserLocation(): void {
    this.loadingLocation = true;
    this.mapService.getCurrentLocation((position) => {
      this.initialLocation = position;
      this.requests = this.guruServicesRequestsService.getClientsRequests();

      // THIS IF CONDITION IS JUST FOR TESTING AND WILL NEED TO REMOVE IT LATER IN THE INTEGRATION PHASE
      if (this.initialLocation) {
        let val = -0.2;
        this.requests.forEach((request) => {
          request.position = {
            lng: position.lng + val,
            lat: position.lat + val,
          };
          val += 0.2;
        });
      }
      this.loadingLocation = false;
    });
  }
}
