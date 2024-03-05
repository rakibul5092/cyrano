import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { fromEvent, Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public segmentTabs = ['ADMIN.UNMATCHED(S)', 'ADMIN.GURUS'];
  public selectedTab = 'ADMIN.UNMATCHED(S)';
  public orientation = ProfileHeaderOrientation.horizontal;
  public screenWidth = 0;
  public resizeObservable: Subscription;

  public profiles: Profile[] = [
    {
      id: 1,
      name: 'Eric Foreman',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
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
      id: 2,
      name: 'Eric Foreman',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
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
      id: 3,
      name: 'Eric Foreman',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
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
      id: 4,
      name: 'Eric Foreman',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
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
      id: 5,
      name: 'Eric Foreman',
      value: 21,
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
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

  /**
   *
   * @param commonUtilService
   */
  constructor(public readonly commonUtilService: CommonUtilService) {}

  //* **/
  ngOnDestroy(): void {
    if (this.resizeObservable) {
      this.resizeObservable.unsubscribe();
    }
  }

  /***/
  ngOnInit(): void {
    this.screenWidth = window.screen.width;
    this.resizeObservable = fromEvent(window, 'resize')
      .pipe()
      .subscribe((event: any) => (this.screenWidth = event.target.innerWidth)); // screen resize lister for small input placeholder for narrow screens
  }

  /***/
  public gotoProfile(profile: any): void {
    this.commonUtilService.navigate('admin/profile/' + profile.id);
  }

  /**
   *
   * @param event
   */
  public onChange(event): void {
    this.selectedTab = event.detail.value;
  }
}
