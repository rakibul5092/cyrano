import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
})
export class ActivityLogComponent {
  /***/
  constructor(public commonUtilService: CommonUtilService, public modalCtrl: ModalController) {}

  /**
   * TODO: IMPLEMENT
   * TODO: ADD JS_DOC LATER WHEN IMPLEMENTED
   */
  removeTag(): void {
    throw new Error('Not implemented yet!');
  }
}
