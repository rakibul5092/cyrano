import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { SwiperOptions } from 'swiper';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
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

  public orientation = 'vertical';
  public config: SwiperOptions = {
    spaceBetween: 12,
    width: 86,
    height: 86,
  };

  /**
   * @param commonutilService
   * @param guruHeaderService
   */
  constructor(public commonutilService: CommonUtilService, private guruHeaderService: GuruHeaderService, private nav: NavController) {}

  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle(null);
  }
}
