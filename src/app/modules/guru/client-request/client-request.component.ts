import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib/lib/shared-components/profile-header/orientation.enum';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.scss'],
})
export class ClientRequestComponent {
  public orientation = ProfileHeaderOrientation.horizontal;
  public request: Profile = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/WvxQhSj/unsplash-d1-UPki-Fd04-Aclient.png',
    notification: 10,
    age: 23,
    address: 'New York City, NY',
    status: { key: 'Type', value: 'Live' },
    myPhotos: [
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    ],
  };

  private headerTitle: string = 'CLIENT_REQUESTS';

  /**
   * @param commonUtilService
   * @param modalController
   * @param guruHeaderService
   */
  constructor(public commonUtilService: CommonUtilService, private guruHeaderService: GuruHeaderService) {}

  /**
   * Initializing header title
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }
}
