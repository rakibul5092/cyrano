import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  constructor(private modalController: ModalController) {}

  /**
   * close the confirm dialog
   *
   * @param confirmed
   */
  public closeModal(confirmed): void {
    this.modalController.dismiss({ confirmed }, 'confirm');
  }
}
