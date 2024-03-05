import { Component, OnInit } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib/lib/shared-components/profile-header/orientation.enum';
import { Profile } from 'src/app/models/profile.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { GuruHeaderService } from '../../guru-header/guru-header.service';

@Component({
  selector: 'app-client-context',
  templateUrl: './client-context.component.html',
  styleUrls: ['./client-context.component.scss'],
})
export class ClientContextComponent implements OnInit {
  public previews: string[] = [
    'https://i.ibb.co/VtmdffY/Rectangle-75preview.png',
    'https://i.ibb.co/VtmdffY/Rectangle-75preview.png',
    'https://i.ibb.co/VtmdffY/Rectangle-75preview.png',
  ];

  public orientation = ProfileHeaderOrientation.horizontal;
  public client: Profile = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/WvxQhSj/unsplash-d1-UPki-Fd04-Aclient.png',
    notification: 10,
    age: 23,
    address: 'New York City, NY',
    status: { key: 'Type', value: 'Live' },
    myPhotos: [
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    ],
  };

  private headerTitle: string = 'CLIENT_CONTEXT';

  /**
   * @param commonService
   * @param guruHeaderService
   */
  constructor(public commonService: CommonUtilService, private guruHeaderService: GuruHeaderService) {}

  /**
   * Initial component state
   */
  ngOnInit(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }
}
