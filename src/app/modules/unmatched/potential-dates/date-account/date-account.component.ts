import { Component, OnInit } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-date-account',
  templateUrl: './date-account.component.html',
  styleUrls: ['./date-account.component.scss'],
})
export class DateAccountComponent implements OnInit {
  public orientation = ProfileHeaderOrientation.vertical;

  public account: Profile = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/wS91BYg/unsplash-Ao-L-m-Vxprmkprofile.png',
    notification: 10,
    age: 23,
    address: 'New York City, NY',
    myPhotos: [
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    ],
  };

  public config: SwiperOptions = {
    spaceBetween: 12,
    width: 86,
    height: 86,
  };

  /**
   * @param commonService
   */
  constructor(public commonService: CommonUtilService) {}

  /***/
  ngOnInit(): void {
    window.ondragstart = (): boolean => false;
  }
}
