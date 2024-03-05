import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { BehaviorSubject } from 'rxjs';
import { GuruStatus } from 'src/app/enums/potential-dates-guru-status.enum';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-potential-dates-select-guru',
  templateUrl: './potential-dates-select-guru.component.html',
  styleUrls: ['./potential-dates-select-guru.component.scss', '../potential-dates-shared-style.scss'],
})
export class PotentialDatesSelectGuruComponent {
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

  public guruStatus = new BehaviorSubject<string>(GuruStatus.confirmation);
  public guruStatusEnum = GuruStatus;

  /**
   * @param commonService
   */
  constructor(public commonService: CommonUtilService) {}

  /***/
  public onGuruConfirm(): void {
    this.guruStatus.next(GuruStatus.guruConfirmed);
  }

  /***/
  public onChangeGuru(): void {
    this.guruStatus.next(GuruStatus.noGuru);
  }
}
