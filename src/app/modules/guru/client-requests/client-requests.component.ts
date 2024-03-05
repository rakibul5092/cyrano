import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib/lib/shared-components/profile-header/orientation.enum';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-client-requests',
  templateUrl: './client-requests.component.html',
  styleUrls: ['./client-requests.component.scss'],
})
export class ClientRequestsComponent {
  public orientation = ProfileHeaderOrientation.horizontal;
  public requests: Profile[] = [
    {
      id: 1,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/WvxQhSj/unsplash-d1-UPki-Fd04-Aclient.png',
      notification: 10,
      age: 23,
      address: 'New York City, NY test address start here',
      status: { key: 'Type', value: 'Live' },
      myPhotos: [
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      ],
    },
    {
      id: 1,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/WvxQhSj/unsplash-d1-UPki-Fd04-Aclient.png',
      notification: 10,
      age: 23,
      address: 'New York City, NY',
      status: { key: 'Looking for a date with', value: 'Sharon' },
      myPhotos: [
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      ],
    },
    {
      id: 1,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/WvxQhSj/unsplash-d1-UPki-Fd04-Aclient.png',
      notification: 10,
      age: 23,
      address: 'New York City, NY',
      status: { key: 'Looking for a date with', value: 'Sharon' },
      myPhotos: [
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      ],
    },
  ];

  private headerTitle: string = 'CLIENT_REQUESTS';

  /**
   * @param commonUtilService
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
