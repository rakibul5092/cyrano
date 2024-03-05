import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-guru-dashboard',
  templateUrl: './guru-dashboard.component.html',
  styleUrls: ['./guru-dashboard.component.scss'],
})
export class GuruDashboardComponent implements OnInit {
  public statistics: any[];
  public presentClients: any[];
  public clientsSwipperOptions: any = {
    slidesPerView: 1,
    spaceBetween: 25,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    scrollbar: { draggable: true },
    breakpoints: {
      360: {
        slidesPerView: 2,
        spaceBetween: 35,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  };

  /**
   *
   * @param nav
   */
  constructor(private nav: NavController) {}

  ngOnInit(): void {
    this.getClients();
  }

  /**
   * Navigate
   */
  public navigateToClients(): void {
    this.nav.navigateForward('/guru/clients', { animated: true, animationDirection: 'forward' });
  }

  private getClients(): void {
    this.statistics = [
      { title: 'GURU.EARNINGS', value: 240, unit: '$' },
      { title: 'GURU.CLIENTS', value: 36, unit: '' },
      { title: 'GURU.CLIENTS', value: 36, unit: '' },
    ];
    this.presentClients = [
      { name: 'James Sullivan', value: 21, photo: 'https://semantic-ui.com/images/avatar2/large/matthew.png' },
      { name: 'James Sullivan', value: 21, photo: 'https://semantic-ui.com/images/avatar2/large/matthew.png' },
      { name: 'James Sullivan', value: 21, photo: 'https://semantic-ui.com/images/avatar2/large/matthew.png' },
      { name: 'James Sullivan', value: 21, photo: 'https://semantic-ui.com/images/avatar2/large/matthew.png' },
      { name: 'James Sullivan', value: 21, photo: 'https://semantic-ui.com/images/avatar2/large/matthew.png' },
    ];
  }
}
