import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib/lib/shared-components/profile-header/orientation.enum';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public client: Profile = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    notification: 10,
    age: 23,
    address: 'New York City, NY',
    myPhotos: [
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    ],
  };

  public statistics: any[] = [
    { type: 'GURU.EARNINGS', value: 240, unit: '$', maxValue: 500 },
    { type: 'GURU.CLIENTS', value: 5, unit: '', maxValue: 100 },
    { type: 'GURU.CLIENTS', value: 36, unit: '', maxValue: 100 },
  ];

  public orientation = ProfileHeaderOrientation.vertical;

  /**
   * @param commonUtilService
   * @param guruHeaderService
   */
  constructor(public commonUtilService: CommonUtilService, private guruHeaderService: GuruHeaderService) {}

  /**
   * Initializing header title
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle(null);
  }

  /***/
  public gotoCashoutEarnings(): void {
    this.commonUtilService.navigate('/guru/cashout-earnings');
  }
}
