import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { EventModel } from '../../models/calendar.models';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
})
export class EventInfoComponent {
  public eventData: EventModel;

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.eventData = this.navParams.get('eventData');
  }

  /**
   * on close modal
   */
  public closeModal(): void {
    this.modalController.dismiss({}, 'confirm');
  }

  /**
   * on edit event
   */
  public editEvent(): void {
    this.modalController.dismiss({ action: 'edit' }, 'confirm');
  }

  /**
   * on delete event
   *
   */
  public async deleteEvent(): Promise<void> {
    await this.modalController.dismiss({ action: 'delete' }, 'confirm');
  }
}
