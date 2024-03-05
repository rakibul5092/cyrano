import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-potential-dates-locations',
  templateUrl: './potential-dates-locations.component.html',
  styleUrls: ['./potential-dates-locations.component.scss', '../potential-dates-shared-style.scss'],
})
export class PotentialDatesLocationsComponent {
  public datelocationsArray = [1, 2, 3, 4];
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
      'https://i.ibb.co/wS91BYg/unsplash-Ao-L-m-Vxprmkprofile.png',
      'https://i.ibb.co/wS91BYg/unsplash-Ao-L-m-Vxprmkprofile.png',
      'https://i.ibb.co/wS91BYg/unsplash-Ao-L-m-Vxprmkprofile.png',
    ],
  };

  /**
   * @param commonService
   */
  constructor(public commonService: CommonUtilService) {}
}
