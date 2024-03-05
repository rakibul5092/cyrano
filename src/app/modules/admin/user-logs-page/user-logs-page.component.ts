import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-user-logs-page',
  templateUrl: './user-logs-page.component.html',
  styleUrls: ['./user-logs-page.component.scss'],
})
export class UserLogsPageComponent {
  public profile: Profile = {
    id: 5,
    name: 'Eric Foreman',
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
  };

  public orientation = ProfileHeaderOrientation.vertical;

  /**
   * @param commonServices
   */
  constructor(public readonly commonServices: CommonUtilService) {}
}
