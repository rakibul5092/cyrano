import { Component } from '@angular/core';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  public notifications: any[] = [
    {
      photo: 'https://i.ibb.co/DzsMCs4/unsplash-sg-g-Rhb-YXhcnotification.png',
      firstName: 'Liza',
      lastName: '',
    },
    {
      photo: 'https://i.ibb.co/DzsMCs4/unsplash-sg-g-Rhb-YXhcnotification.png',
      firstName: 'Liza',
      lastName: '',
    },
    {
      photo: 'https://i.ibb.co/DzsMCs4/unsplash-sg-g-Rhb-YXhcnotification.png',
      firstName: 'Liza',
      lastName: '',
    },
  ];

  private headerTitle: string = 'NOTIFICATIONS';

  /**
   * @param guruHeaderService
   */
  constructor(private guruHeaderService: GuruHeaderService) {}

  /**
   * Initializing header title
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }
}
