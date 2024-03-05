import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CacheKeys, CacheService } from 'src/app/services/cache-service.service';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  public clients: any[];
  public tabs = ['GURU.YOUR_CLIENTS', 'GURU.CLIENT_REQUESTS'];
  public selectedTab = 'GURU.YOUR_CLIENTS';
  public user: any;
  private headerTitle: string = 'YOUR_CLIENTS';

  /**
   * @param navController
   * @param cacheService
   * @param guruHeaderService
   */
  constructor(private navController: NavController, private cacheService: CacheService, private guruHeaderService: GuruHeaderService) {}

  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }

  /**
   * Initialize data
   */
  ngOnInit(): void {
    this.user = this.cacheService.getSessionData(CacheKeys.user);

    this.clients = [
      {
        id: 1,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 10,
      },
      {
        id: 2,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 6,
      },
      {
        id: 3,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 0,
      },
      {
        id: 4,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 0,
      },
      {
        id: 5,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 0,
      },
      {
        id: 6,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 0,
      },
      {
        id: 7,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 0,
      },
      {
        id: 8,
        name: 'James Sullivan',
        value: 21,
        photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
        notification: 0,
      },
    ];
  }

  /**
   *
   * @param event
   */
  public onChange(event): void {
    this.selectedTab = event.detail.value;
  }

  /**
   *
   * @param id
   */
  public gotoProfileDetails(id: any): void {
    this.navController.navigateForward('/guru/client/' + id, { animated: true, animationDirection: 'forward' });
  }
}
