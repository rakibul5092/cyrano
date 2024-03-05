import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { DateTimeComponent } from './date-time.component';
import { datePickerSheetModalConfig, dateTimePresentation, SelectedDateModel } from './date-time.config';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor(private modalController: ModalController, private datePipe: DatePipe) {}

  /**
   * format s given date
   *
   * @param value is the date value
   * @param presentation is the format presentation
   * @param format
   * @private
   */
  public formatDateTime(value: Date, presentation: dateTimePresentation, format?: string): string {
    if (!value) {
      return '';
    }
    let formattedValue: string = value.toString();
    switch (presentation) {
      case dateTimePresentation.date: {
        formattedValue = this.datePipe.transform(value, format || 'yyyy-MM-dd');
        break;
      }
      case dateTimePresentation.time: {
        formattedValue = this.datePipe.transform(value, format || 'h:mm a');
        break;
      }
    }
    return formattedValue;
  }

  /**
   * open date picker modal
   *
   * @param presentation
   * @param selectedValue
   * @param maxDate
   * @param minDate
   */
  public async openDateTimePicker(presentation: dateTimePresentation, selectedValue?: Date, maxDate?: Date, minDate?: Date): Promise<SelectedDateModel> {
    const modal = await this.modalController.create({
      ...datePickerSheetModalConfig,
      component: DateTimeComponent,
      componentProps: { presentation, selectedValue, maxDate, minDate },
      backdropDismiss: false,
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    const defaultDate = maxDate || new Date();

    const selectedDateModel: SelectedDateModel =
      modalData && modalData.data
        ? modalData.data
        : {
            formattedValue: this.formatDateTime(selectedValue || defaultDate, presentation),
            value: selectedValue || defaultDate,
          };

    if (selectedDateModel && selectedDateModel.clear) {
      selectedDateModel.formattedValue = '';
      selectedDateModel.value = null;
    }

    return selectedDateModel && !selectedDateModel.cancel ? selectedDateModel : null;
  }

  /**
   *
   * @param hour hour in 24hrs format
   * @returns 'am' | 'pm' | 'AM' | 'PM'
   */
  public getMeridian(hour: number): 'am' | 'pm' | 'AM' | 'PM' {
    return hour > 11 ? 'PM' : 'AM';
  }

  public hour12(hour: number): string {
    const hr = hour === 12 || hour === 0 ? 12 : hour % 12;
    return hr.toString().padStart(2, '0');
  }
}
