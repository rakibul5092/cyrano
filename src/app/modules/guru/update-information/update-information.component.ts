import { Component } from '@angular/core';
import { ICONS } from 'src/app/theme/theme.icons';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.scss'],
})
export class UpdateInformationComponent {
  public icons = ICONS.commonIcons;

  /**
   *
   * @param guruHeaderService
   */
  constructor(private guruHeaderService: GuruHeaderService) {}

  /**
   * Initialize things here
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setNotificationsVisible(true);
    this.guruHeaderService.setTitle(null);
  }

  /**
   * Hide or remove or destroy on this scope
   */
  ionViewWillLeave(): void {
    this.guruHeaderService.setNotificationsVisible(false);
  }
}
