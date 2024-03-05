import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { CommonUtilService } from '../../../../../services/common-utils.service';
import { GURU_ROUTES } from '../../../enums/guru.enum';
import { DateRequestModel } from '../../models/date.request.model';

@Component({
  selector: 'app-guru-services-request',
  templateUrl: './guru-services-request.component.html',
  styleUrls: ['./guru-services-request.component.scss'],
})
export class GuruServicesRequestComponent implements OnInit {
  public icons: any;
  public request: DateRequestModel;

  constructor(private commonUtilService: CommonUtilService, private modalController: ModalController, private navParams: NavParams, private navController: NavController) {}

  ngOnInit(): void {
    this.request = this.navParams.get('request');
    this.icons = this.commonUtilService.icons;
  }

  /**
   * accept request
   */
  public async acceptRequest(): Promise<void> {
    await this.modalController.dismiss({ action: 'cancel' }, 'confirm');
    this.navController.navigateForward(GURU_ROUTES.CLIENTS + '/1', { animated: true, animationDirection: 'forward' });
  }

  /**
   * cancel request
   */
  public cancelRequest(): void {
    this.modalController.dismiss({ action: 'cancel' }, 'confirm');
  }
}
