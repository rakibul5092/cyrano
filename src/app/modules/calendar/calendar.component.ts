import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarEvent, CalendarView, CalendarWeekViewComponent } from 'angular-calendar';
import { addDays, isAfter, isBefore, isEqual, startOfDay, startOfWeek } from 'date-fns';
import { Observable, Subject, takeUntil } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertTypes, modalConfig, sheetModalConfig } from '../../lookups/app.lookups';
import { CalendarAccountModel, DEFAULT_ACCOUNT_THEME } from '../../models/calendar.account.model';
import { AlertService } from '../../services/alert.service';
import { CacheKeys, CacheService } from '../../services/cache-service.service';
import { ConfirmModalComponent } from '../shared/components/confirm-modal/confirm-modal.component';
import { UserRegistrationService } from '../user-registration/services/user-registration.service';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { ManageCalendarComponent } from './components/manage-calendar/manage-calendar.component';
import { DaysFilterModel, EventModel, WeekDayModel } from './models/calendar.models';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnDestroy {
  @ViewChild('calendarDayViewComponent') calendarDayViewComponent: CalendarWeekViewComponent;
  @ViewChild('calendarWeekViewComponent') calendarWeekViewComponent: CalendarWeekViewComponent;
  @ViewChild('headerSlider', { static: true }) headerSlider: ElementRef | undefined;
  @ViewChild('calenderContainer', { static: true }) calenderContainer: ElementRef | undefined;

  public events: EventModel[] = [];
  public calendarEvents: CalendarEvent<EventModel>[] = [];
  public filteredEvents: CalendarEvent<EventModel>[] = [];
  public viewDate: Date = this.calendarService.getStartOfWeek();
  public today: Date = new Date();
  public selectedDate;
  public loading: boolean;
  public calendars: CalendarAccountModel[];
  public refresh = new Subject<void>();
  public currentWeekDays: WeekDayModel[] = [];
  public view: CalendarView = CalendarView.Week;
  public daysInWeek: number = 7;
  public selectedFilter: DaysFilterModel;
  public loading$: Observable<boolean>;
  private userId: string;
  private destroy$: Subject<void> = new Subject();
  private selectedCalendars: CalendarAccountModel[];

  constructor(
    private modalController: ModalController,
    private alertService: AlertService,
    private calendarService: CalendarService,
    private cacheService: CacheService,
    private userRegistrationService: UserRegistrationService,
  ) {}

  ionViewWillEnter(): void {
    const currentUser = this.cacheService.getSessionData(CacheKeys.user);
    this.userId = currentUser?._id;
    this.loading$ = this.calendarService.loading;
    this.getCalendars();
    this.currentWeekDays = this.calendarService.buildCurrentWeekDays(this.viewDate, this.daysInWeek);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * add new event
   */
  public async onAddEvent(selectedDate?: Date): Promise<void> {
    const eventData: any = { startDate: selectedDate, startTime: selectedDate };
    const modal = await this.calendarService.createEventFormComponentModal(eventData, this.userId);
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData && modalData.data && modalData.data.eventData) {
      const event = this.calendarService.buildCalendarEvent(modalData.data.eventData, this.calendars);
      if (event) {
        this.events = [...this.events, modalData.data.eventData];
        this.filteredEvents = [...this.filteredEvents, event];
        this.calendarEvents = [...this.calendarEvents, event];
      }
    }
  }

  /**
   * edit selected event
   *
   * @param action
   * @param event
   */
  public async onEditEvent(action: string, event: CalendarEvent): Promise<void> {
    const eventInfoModal = await this.modalController.create({ ...modalConfig, component: EventInfoComponent, componentProps: { eventData: event.meta } });
    await eventInfoModal.present();
    const eventInfoModalData = await eventInfoModal.onWillDismiss();
    if (eventInfoModalData && eventInfoModalData.data && eventInfoModalData.data.action) {
      if (eventInfoModalData.data.action === 'edit') {
        const modal = await this.calendarService.createEventFormComponentModal(Object.create(event.meta), this.userId);
        await modal.present();
        const modalData = await modal.onWillDismiss();
        if (modalData && modalData.data && modalData.data.eventData) {
          const updatedEvent = this.calendarService.buildCalendarEvent(modalData.data.eventData, this.calendars);
          updatedEvent.meta = modalData.data.eventData;
          if (updatedEvent) {
            // workaround to refresh the calendar events
            const eventIndex = this.calendarEvents.indexOf(this.calendarEvents.find((eventItem) => eventItem.meta._id === event.meta._id));
            this.calendarEvents[eventIndex] = updatedEvent;

            const e = this.filteredEvents.find((eventItem) => eventItem.meta._id === event.meta._id);
            const filteredEventIndex = this.filteredEvents.indexOf(e);
            this.filteredEvents[filteredEventIndex] = updatedEvent;
            this.filteredEvents = [...this.filteredEvents];
          }
        }
      } else {
        await this.deleteEvent(action, event);
      }
    }
  }

  /**
   * manage events
   */
  public async onManageEvent(): Promise<void> {
    const modal = await this.modalController.create({
      ...sheetModalConfig,
      initialBreakpoint: 0.4,
      component: ManageCalendarComponent,
      componentProps: { calendars: this.calendars },
    });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData && modalData.data && modalData.data.calendars) {
      this.selectedCalendars = modalData.data.calendars.filter((calendar) => calendar.selected);
      this.filterCalendarsEvents();
    }
  }

  /**
   * on calendar time slot clicked
   *
   * @param event
   */
  public onHourSegmentClicked(event): void {
    this.onAddEvent(event.date);
  }

  /**
   * filter the calendar based on the selected days
   *
   * @param event
   */
  public onDaysFilterEvent(event: DaysFilterModel): void {
    if (event) {
      this.selectedFilter = event;
      const today = new Date();
      const filterMaxDate = startOfDay(event.value === 1 ? today : addDays(new Date(), event.value - 1));
      this.view = event.value === 1 ? CalendarView.Day : CalendarView.Week;
      this.viewDate = event.value === 7 ? startOfWeek(this.viewDate) : today;
      this.daysInWeek = event.value;
      this.currentWeekDays = this.calendarService.buildCurrentWeekDays(this.viewDate, this.daysInWeek);
      this.filteredEvents =
        event.value === 7
          ? this.calendarEvents
          : this.calendarEvents.filter(
              (eventObject) =>
                (isBefore(startOfDay(eventObject.start), filterMaxDate) || isEqual(startOfDay(eventObject.start), filterMaxDate)) &&
                (isAfter(startOfDay(eventObject.start), startOfDay(today)) || isEqual(startOfDay(eventObject.start), startOfDay(today))),
            );
    }
  }

  /**
   * on calendar pagination change
   */
  public onPaginationChange(): void {
    if ((this.selectedFilter && this.selectedFilter.value === 7) || !this.selectedFilter) {
      this.viewDate = startOfWeek(this.viewDate);
      this.filteredEvents = this.calendarEvents;
    }
    this.currentWeekDays = this.calendarService.buildCurrentWeekDays(this.viewDate, this.daysInWeek);
    this.getEvents();
  }

  public onContinue(): void {
    this.userRegistrationService.routeToNextPage({}, 'freeSlots').subscribe();
  }

  /**
   * get current user events
   *
   * @private
   */
  private getEvents(): void {
    this.calendarService
      .getEvents(this.userId, startOfDay(this.viewDate).toISOString(), addDays(startOfDay(this.viewDate), 7).toISOString())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (events) => {
          this.events = events;
          this.calendarEvents = this.events.map((value) => this.calendarService.buildCalendarEvent(value, this.calendars));
          this.filteredEvents = this.calendarEvents;
          if (this.selectedCalendars && this.selectedCalendars.length > 0) {
            this.filterCalendarsEvents();
          }
        },
        error: async () => await this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.GET_EVENTS_FAILED', AlertTypes.error),
      });
  }

  /**
   * get current user calendar accounts
   *
   * @private
   */
  private getCalendars(): void {
    this.calendarService
      .getCalendarAccounts(this.userId)
      .pipe(takeUntil(this.destroy$))
      .pipe(finalize(() => this.getEvents()))
      .subscribe({
        next: (calendars) => {
          this.calendars = calendars;
          this.calendars.forEach((value) => (value.selected = true));
          this.calendars.push({ title: 'Cyrano Events', selected: true, theme: DEFAULT_ACCOUNT_THEME });
        },
        error: async () => await this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.GET_CALENDARS_FAILED', AlertTypes.error),
      });
  }

  /**
   * delete event
   *
   * @param action
   * @param event
   * @private
   */
  private async deleteEvent(action: string, event: CalendarEvent): Promise<void> {
    const modal = await this.modalController.create({ ...modalConfig, component: ConfirmModalComponent });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData) {
      if (modalData.data?.confirmed) {
        this.calendarService
          .delete(event.meta)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            complete: () => {
              this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.EVENT_DELETE_SUCCESSFULLY', AlertTypes.success);
              this.events = this.events.filter((eventObject) => eventObject._id !== event.meta._id);
              this.filteredEvents = this.filteredEvents.filter((eventObject) => eventObject.meta !== event.meta);
              this.calendarEvents = this.calendarEvents.filter((eventObject) => eventObject.meta !== event.meta);
            },
            error: async () => await this.alertService.alert('CALENDAR.TITLE', 'CALENDAR.EVENT_DELETE_FAILED', AlertTypes.error),
          });
      } else {
        this.onEditEvent(action, event);
      }
      await this.modalController.dismiss({ action: 'delete' }, 'confirm');
    }
  }

  /**
   * filter events based on the selected calendars
   * @private
   */
  private filterCalendarsEvents(): void {
    if (this.selectedCalendars && this.selectedCalendars.length > 0) {
      const filteredEvents =
        this.events.filter(
          (event) => this.selectedCalendars.find((selectedCalendar) => selectedCalendar.email === event.email || (!selectedCalendar.email && !event.type)) != null,
        ) || [];
      this.filteredEvents = filteredEvents.map((value) => this.calendarService.buildCalendarEvent(value, this.calendars));
    } else {
      this.filteredEvents = [];
    }
  }
}
