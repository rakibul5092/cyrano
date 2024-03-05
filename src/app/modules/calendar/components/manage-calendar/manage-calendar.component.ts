import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CalendarAccountModel } from '../../../../models/calendar.account.model';

@Component({
  selector: 'app-manage-calendar',
  templateUrl: './manage-calendar.component.html',
  styleUrls: ['./manage-calendar.component.scss'],
})
export class ManageCalendarComponent implements OnInit {
  public calendars: CalendarAccountModel[];
  public selectAll: boolean;
  constructor(private navParams: NavParams, private modalController: ModalController) {}

  ngOnInit(): void {
    this.calendars = this.navParams.get('calendars');
    this.checkSelectedFilter();
  }

  /**
   * save manage events
   */
  public saveEvent(): void {
    this.modalController.dismiss({ calendars: this.calendars }, 'confirm');
  }

  /**
   * on calendar selection change
   *
   * @param selected
   * @param i
   */
  public onChange(selected, i): void {
    this.calendars[i].selected = selected;
    const selectedCalendars = this.calendars.filter((calendar) => calendar.selected);
    if (!selected) {
      this.selectAll = false;
    }
    if (selectedCalendars && selectedCalendars.length === this.calendars.length) {
      this.selectAll = true;
    }
  }

  /**
   * on cselect all change
   *
   * @param selected
   */
  public onSelectAllChange(selected): void {
    this.selectAll = selected;
    this.calendars.forEach((calendar) => (calendar.selected = selected));
  }

  /**
   * check selected calendars
   */
  public checkSelectedFilter(): void {
    if (!this.calendars) {
      return;
    }
    const selectedCalendars = this.calendars.filter((calendar) => calendar.selected);
    this.selectAll = selectedCalendars && selectedCalendars.length === this.calendars.length;
  }
}
