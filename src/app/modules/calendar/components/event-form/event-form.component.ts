import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { addYears, endOfDay, endOfYear, isBefore, startOfDay } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';
import { AlertTypes } from '../../../../lookups/app.lookups';
import { AlertService } from '../../../../services/alert.service';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { dateTimePresentation, SelectedDateModel } from '../../../shared/components/date-time/date-time.config';
import { DateTimeService } from '../../../shared/components/date-time/date-time.service';
import { EventModel } from '../../models/calendar.models';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit, OnDestroy, AfterViewInit {
  public presentation = dateTimePresentation;
  public userId: string;
  public eventData: EventModel;
  public loading: boolean;
  public form: FormGroup;
  private destroy$: Subject<void> = new Subject();
  private initialValues: EventModel;

  constructor(
    public fb: FormBuilder,
    private commonUtilService: CommonUtilService,
    private alertService: AlertService,
    private modalController: ModalController,
    private calendarService: CalendarService,
    private dateTimeService: DateTimeService,
    private navParams: NavParams,
  ) {}

  ngOnInit(): void {
    this.buildForm(this.navParams.get('eventData') || {});
    this.userId = this.navParams.get('userId');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.initialValues = this.form.value;
  }

  /**
   * on save event
   */
  public saveEvent(): void {
    if (this.form.valid) {
      if (this.commonUtilService.deepEqual(this.initialValues, this.form.value)) {
        this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.EVENT_NOT_CHANGED', AlertTypes.warning);
        return;
      }
      const eventData = this.form.value;

      // set event start date & time
      const startDate: Date = eventData.allDay ? startOfDay(new Date(this.eventData.startDate)) : new Date(this.eventData.startDate);
      const startTime = eventData.allDay ? startDate : new Date(this.eventData.startTime);
      eventData.startDate = startDate;
      eventData.startTime = startTime;

      // set event end date & time
      eventData.endDate = eventData.allDay ? endOfDay(startDate) : new Date(this.eventData.endDate);
      const endTime = eventData.allDay ? eventData.endDate : new Date(this.eventData.endTime);
      eventData.endTime = endTime;

      if (!eventData.allDay) {
        this.calendarService.setEventTime(eventData.startDate, startTime);
        this.calendarService.setEventTime(eventData.endDate, endTime);
      }

      // check if end date before start date
      if (!eventData.allDay && isBefore(eventData.endDate, eventData.startDate)) {
        this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.EVENT_DATE_ERROR', AlertTypes.error);
        return;
      }
      this.calendarService
        .update(eventData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (updatedEvent: EventModel) => {
            this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.EVENT_SAVED_SUCCESSFULLY', AlertTypes.success);
            this.modalController.dismiss({ eventData: updatedEvent }, 'confirm');
          },
          error: async () => await this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.EVENT_SAVED_FAILED', AlertTypes.error),
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * on select date or time
   *
   * @param event
   * @param presentation
   * @param controlName
   */
  public async openDateTimePicker(event, presentation: dateTimePresentation, controlName: string): Promise<void> {
    event.stopPropagation();
    event.preventDefault();
    const defaultValue = this.eventData[controlName] ? new Date(this.eventData[controlName]) : null;
    const selectedValue: SelectedDateModel = await this.dateTimeService.openDateTimePicker(presentation, defaultValue, endOfYear(addYears(new Date(), 1)));
    if (selectedValue) {
      this.form.controls[controlName].setValue(selectedValue.formattedValue);
      this.eventData[controlName] = selectedValue.value;
    }
  }

  /**
   * build event form
   *
   * @private
   */
  private buildForm(eventData): void {
    this.eventData = eventData;
    this.form = this.fb.group({
      _id: [eventData._id, []],
      accountId: [eventData.accountId, []],
      type: [eventData.type, []],
      email: [eventData.email, []],
      userId: [this.userId, [Validators.required]],
      title: [eventData.title, [Validators.required]],
      allDay: [eventData.allDay || false, []],
      startDate: [this.dateTimeService.formatDateTime(eventData.startDate, this.presentation.date), [Validators.required]],
      startTime: [this.dateTimeService.formatDateTime(eventData.startTime, this.presentation.time), [Validators.required]],
      endDate: [this.dateTimeService.formatDateTime(eventData.endDate, this.presentation.date), [Validators.required]],
      endTime: [this.dateTimeService.formatDateTime(eventData.endTime, this.presentation.time), [Validators.required]],
      note: [eventData.note, []],
    });
    this.handleAllDayEvents(eventData.allDay);

    // ------- watch all day event toggle -------------
    this.form.controls.allDay.valueChanges.subscribe((value) => {
      this.handleAllDayEvents(value);
    });
  }

  /**
   * check if is an event is all day event then manage the form validations
   *
   * @param allDay
   * @private
   */
  private handleAllDayEvents(allDay: boolean): void {
    this.form.controls.endDate.setValidators(allDay ? [] : [Validators.required]);
    this.form.controls.endTime.setValidators(allDay ? [] : [Validators.required]);
    this.form.controls.startTime.setValidators(allDay ? [] : [Validators.required]);
    this.form.controls.endDate.updateValueAndValidity();
    this.form.controls.endTime.updateValueAndValidity();
    this.form.controls.startTime.updateValueAndValidity();
  }
}
