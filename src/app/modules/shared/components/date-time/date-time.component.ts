import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IonDatetime, ModalController, NavParams } from '@ionic/angular';
import { format, parse, parseISO } from 'date-fns';

import { dateTimePresentation, presentationFormat } from './date-time.config';
import { DateTimeService } from './date-time.service';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent implements AfterViewInit {
  @ViewChild('datetime') datetime: IonDatetime;
  public presentation: dateTimePresentation;
  public dateTimeCTRL: FormControl = new FormControl<any>(null);
  public maxDate;
  public minDate;
  private selectedValue: string;
  private selectedValueFormat: string;

  constructor(private navParams: NavParams, private modalController: ModalController, private dateTimeService: DateTimeService) {}

  ngAfterViewInit(): void {
    this.initDateTimePicker();
  }

  /**
   * on date time modal Clear
   */
  public onClear(): void {
    this.selectedValue = '';
    this.modalController.dismiss({ clear: true }, 'confirm');
  }

  /**
   * on date time modal cancel
   */
  public onCancel(): void {
    this.modalController.dismiss({ cancel: true }, 'confirm');
  }

  /**
   * on date time modal Dismiss
   */
  public async onModalDismiss(): Promise<void> {
    let onlyTime = '';
    if (this.presentation === dateTimePresentation.time) {
      onlyTime = '1970-01-01T';
    }
    const parsedDateString = format(parseISO(onlyTime + this.dateTimeCTRL.value), this.selectedValueFormat);
    const parsedDate = parse(parsedDateString, this.selectedValueFormat, new Date());
    this.selectedValue = this.dateTimeService.formatDateTime(parsedDate, this.presentation);
    this.modalController.dismiss(
      {
        value: parsedDate,
        formattedValue: this.selectedValue,
      },
      'confirm',
    );
  }

  /**
   * initialize and watch the dat time picekr
   *
   * @private
   */
  private initDateTimePicker(): void {
    this.presentation = this.navParams.get('presentation');
    const dateInput = this.navParams.get('selectedValue');

    // ---- format & set min and max ----
    const maxDate = this.navParams.get('maxDate');
    const minDate = this.navParams.get('minDate');
    this.maxDate = maxDate ? (this.datetime.max = format(maxDate, 'yyyy-MM-dd')) : '';
    this.minDate = minDate ? (this.datetime.min = format(minDate, 'yyyy-MM-dd')) : '';

    // ---- format & set default date ----
    this.selectedValueFormat = presentationFormat.get(this.presentation);
    const selectedDate = dateInput ? new Date(dateInput) : new Date();
    const stringFormatDate = format(selectedDate, this.selectedValueFormat);
    this.dateTimeCTRL.setValue(stringFormatDate);
    this.selectedValue = this.dateTimeService.formatDateTime(selectedDate, this.presentation);
    this.dateTimeCTRL.valueChanges.subscribe((value) => {
      this.onModalDismiss();
    });
  }
}
