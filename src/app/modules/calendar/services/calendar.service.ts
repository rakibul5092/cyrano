import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { addDays, isEqual, startOfDay, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CALENDAR_APIS } from 'src/app/lookups/api.lookups';
import { sheetModalConfig } from 'src/app/lookups/app.lookups';
import { HttpUtilService } from 'src/app/services/http-utils.service';
import { CalendarAccountEnum } from '../../../enums/calendar.account.enum';
import { CalendarAccountModel } from '../../../models/calendar.account.model';
import { BaseService } from '../../base/base.service';
import { EventFormComponent } from '../components/event-form/event-form.component';
import { CALENDAR_COLORS } from '../data/calendar-config';
import { EventModel, WeekDayModel } from '../models/calendar.models';
import { AccountSetupService } from './account-setup.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends BaseService<EventModel> {
  private startOfWeek = startOfWeek(new Date(), { weekStartsOn: 0 });
  constructor(private modalController: ModalController, private accountSetupService: AccountSetupService, private utilService: HttpUtilService) {
    super(CALENDAR_APIS.events.url, utilService);
  }

  /**
   * color converter
   *
   * @param hex
   * @param opacity
   * @private
   */
  private static hexToRgb(hex: string, opacity: number = 1): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const rgb = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : null;
  }

  /**
   * return start of current wek
   */
  public getStartOfWeek(): Date {
    return this.startOfWeek;
  }

  /**
   * convert event to calendar event
   *
   * @param event
   * @param calendars
   */
  public buildCalendarEvent(event: EventModel, calendars?: CalendarAccountModel[]): CalendarEvent {
    let accountEventColor: EventColor;
    if (calendars && calendars.length > 0 && event.accountId) {
      const account = calendars.find((value) => value._id === event.accountId);
      if (account && account.theme) {
        accountEventColor = {
          primary: account.theme.borderColor,
          secondary: CalendarService.hexToRgb(account.theme.backgroundColor, 0.2),
          secondaryText: account.theme.foregroundColor,
        };
      }
    }
    return {
      title: event.title,
      allDay: event.allDay,
      start: new Date(event.startDate),
      end: event.allDay ? new Date(event.startDate) : new Date(event.endDate),
      color: accountEventColor || CALENDAR_COLORS.primary,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      meta: event,
    };
  }

  /**
   * build current week days for the calendar header
   *
   * @param currentDate the current calendar view date
   * @param daysInWeek
   * @private
   */
  public buildCurrentWeekDays(currentDate: Date = new Date(), daysInWeek: number = 7): WeekDayModel[] {
    const days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const weekDays: WeekDayModel[] = [];
    days.forEach((day, i) => weekDays.push({ day, dayDate: addDays(startOfWeek(currentDate), i) }));
    if (daysInWeek < 7) {
      const startDay = weekDays.find((day) => isEqual(startOfDay(day.dayDate), startOfDay(currentDate)));
      const startIndex = weekDays.indexOf(startDay);
      const endIndex = startIndex + daysInWeek;
      let currentViewDays: WeekDayModel[] = [];
      if (endIndex > weekDays.length) {
        currentViewDays = weekDays.slice(startIndex, weekDays.length);
        const nextWeekDays = weekDays.slice(0, endIndex - weekDays.length);
        nextWeekDays.forEach((value) => {
          currentViewDays.push({
            day: value.day,
            dayDate: addDays(currentViewDays[currentViewDays.length - 1].dayDate, 1),
          });
        });
      } else {
        currentViewDays = weekDays.slice(startIndex, endIndex);
      }
      return currentViewDays;
    }
    return weekDays;
  }

  /**
   * get cyrano calendar events
   *
   * @param userId
   * @param startDate
   * @param endDate
   */
  public getEvents(userId: string, startDate: string, endDate: string): Observable<EventModel[]> {
    this.setLoading();
    return this.utilService
      .getRequest(CALENDAR_APIS.events.user + userId, { startDate, endDate, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
      .pipe(finalize(() => this.setLoading(false)));
  }

  /**
   * get current user calendar accounts
   */
  public getCalendarAccounts(userId: string, active = true): Observable<CalendarAccountModel[]> {
    this.setLoading();
    return this.accountSetupService.getCalendarAccounts(userId, { active });
  }

  /**
   * create the bottom sheet modal for the calendar event form
   *
   * @param eventData
   * @param userId
   */
  public createEventFormComponentModal(eventData, userId: string): Promise<HTMLIonModalElement> {
    return this.modalController.create({
      ...sheetModalConfig,
      initialBreakpoint: 0.87,
      component: EventFormComponent,
      componentProps: {
        eventData,
        userId,
      },
    });
  }

  /**
   * set event date time from selected time of type date
   *
   * @param eventDate
   * @param eventTime
   */
  public setEventTime(eventDate: Date, eventTime: Date): Date {
    eventDate.setHours(eventTime.getHours());
    eventDate.setMinutes(eventTime.getMinutes());
    return eventDate;
  }

  /**
   * delete event
   *
   * @param event
   */
  public delete(event: EventModel): Observable<EventModel> {
    this.setLoading(true);
    return this.httpUtilService
      .deleteResource(CALENDAR_APIS.events.url + event._id, event.accountId ? { accountId: event.accountId } : {})
      .pipe(finalize(() => this.setLoading(false)));
  }

  /**
   * update event
   *
   * @param event
   */
  public update(event: EventModel): Observable<EventModel> {
    this.setLoading(true);
    if (!event._id) {
      return this.save(event);
    }
    if (event.type === CalendarAccountEnum.MICROSOFT) {
      event.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return this.httpUtilService
      .putResource(CALENDAR_APIS.events.url + event._id, event, event.accountId ? { accountId: event.accountId } : {})
      .pipe(finalize(() => this.setLoading(false)));
  }
}
