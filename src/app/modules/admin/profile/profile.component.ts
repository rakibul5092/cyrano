import { Component, OnInit } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
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
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    ],
  };

  public myPhotosArray = [1, 2, 3];
  public ordersDataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9];

  public orientation = ProfileHeaderOrientation.vertical;

  public config: SwiperOptions = {
    spaceBetween: 12,
    width: 86,
    height: 86,
  };

  /**
   *
   * @param commonServices
   */
  constructor(public readonly commonServices: CommonUtilService) {}

  /***/
  ngOnInit(): void {
    // image drag disabled so that do not cause issue on photo sliding in desktop mode
    window.ondragstart = (): boolean => false;
  }

  /***/
  public gotoLogs(): void {
    this.commonServices.navigate('admin/user-logs');
  }
}
