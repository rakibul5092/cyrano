import { Component } from '@angular/core';
import { Profile } from 'nextsapien-component-lib/lib/shared-components/profile-card/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-potential-dates-home',
  templateUrl: './potential-dates-home.component.html',
  styleUrls: ['./potential-dates-home.component.scss', '../potential-dates-shared-style.scss'],
})
export class PotentialDatesHomeComponent {
  public potentialDatesArray: Profile[] = [
    {
      id: 1,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.5,
    },
    {
      id: 2,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.8,
    },
    {
      id: 3,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.9,
    },
    {
      id: 4,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.3,
    },
    {
      id: 5,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.2,
    },
    {
      id: 6,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.1,
    },
    {
      id: 7,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 0.7,
    },
    {
      id: 8,
      name: 'James Sullivan',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      notification: 0,
      progress: 1,
    },
  ];

  /**
   * @param commonUtils
   */
  constructor(private readonly commonUtils: CommonUtilService) {}

  /***/
  public gotoDatesPage(): void {
    this.commonUtils.navigate('unmatched/potential-dates/potential-date');
  }
}
