import { Injectable } from '@angular/core';
import { startOfWeek } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTH_APIS } from 'src/app/lookups/api.lookups';
import { AlertTypes } from 'src/app/lookups/app.lookups';
import { AlertService } from 'src/app/services/alert.service';
import { CacheService } from 'src/app/services/cache-service.service';
import { HttpUtilService } from 'src/app/services/http-utils.service';
import { EventDay } from '../models/event-day.model';
import { Event } from '../models/event.model';
import { FreeSlotModel } from '../models/free-slot.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public currentWeekDays: Date[] = [];
  public loading = false;

  private data: EventDay = {
    events: [],
    freeSlots: [],
  };

  private events = new BehaviorSubject<Event[]>(this.data.events);
  private freeSlots = new BehaviorSubject<FreeSlotModel[]>(this.data.freeSlots);

  constructor(private httpUtilService: HttpUtilService, private cacheService: CacheService, private alertService: AlertService) {
    const startDate = startOfWeek(new Date());
    const oneDay = 86400000;
    let startDateMs = startDate.getTime();
    const saveStartDateMs = startDateMs;
    startDateMs += oneDay; //   To start listing from monday

    for (let i = 0; i < 6; i++, startDateMs += oneDay) {
      this.currentWeekDays.push(new Date(startDateMs));
    }
    this.currentWeekDays.push(new Date(saveStartDateMs));
  }

  get eventDays$(): Observable<Event[]> {
    return this.events.asObservable();
  }

  get freeSlots$(): Observable<FreeSlotModel[]> {
    return this.freeSlots.asObservable();
  }

  public getEvents(): Event[] {
    return this.data.events;
  }

  public getEventByDay(day: number): Event[] | null {
    if (day < 0 || day > 6) {
      return null;
    }
    return this.data.events.filter((event) => (event.dayOfWeek = day));
  }

  public fetchEvents(): void {
    const get = this.httpUtilService.getRequest(AUTH_APIS.weeklyRoutine).subscribe((data: Event[]) => {
      this.data.events = data;
      this.parseEventDates();
      this.events.next(data);
      this.createFreeSlots();
      get.unsubscribe();
    });
  }

  /**
   * Add a new event
   *
   * @param event new event to be added
   */
  public addEvent(event: Event): void {
    this.loading = true;
    const post = this.httpUtilService.postRequest(AUTH_APIS.weeklyRoutine, event).subscribe(
      (data: Event) => {
        this.data.events.push(data);
        this.parseEventDates();
        const events = [...this.data.events];
        this.events.next(events);
        this.createFreeSlots();
        this.loading = false;
        post.unsubscribe();
      },

      (error) => this.alertService.alert('', 'ROUTINE.ERRORS.UNABLE_TO_ADD_EVENT', AlertTypes.error),
    );
  }

  public removeEvent(event: Event): void {
    const del = this.httpUtilService.deleteResource(`${AUTH_APIS.weeklyRoutine}/${event._id}`).subscribe(
      () => {
        const index = this.data.events.findIndex((evt) => event._id === evt._id);
        if (index >= 0) {
          this.data.events.splice(index, 1);
          this.parseEventDates();
          this.events.next([...this.data.events]);
          this.createFreeSlots();
        }
        del.unsubscribe();
      },

      (error) => this.alertService.alert('', 'ROUTINE.ERRORS.UNABLE_TO_REMOVE_EVENT', AlertTypes.error),
    );
    // this.eventDays[eventDay].events.splice( eventPos, 1 );
  }

  public updateEvent(event: Event): void {
    this.loading = true;
    const put = this.httpUtilService.putResource(`${AUTH_APIS.weeklyRoutine}/${event._id}`, event).subscribe(
      (data: Event) => {
        this.updateEventData(event._id, event);
        const events = [...this.data.events];
        this.events.next(events);
        this.loading = false;
        this.createFreeSlots();
        put.unsubscribe();
      },

      (error) => this.alertService.alert('', 'ROUTINE.ERRORS.UNABLE_TO_UPDATE_EVENT', AlertTypes.error),
    );
  }

  /**
   * Generates free slots where itinerary can be added from intervals between events on free slot
   */
  public createFreeSlots(): void {
    const freeSlots = [];
    //  get events for all day sorted
    for (let i = 0; i < 7; i++) {
      const eventsInDay = this.data.events.filter((event) => event.dayOfWeek === i);
      eventsInDay.sort((a, b) => a.startHour - b.startHour);

      if (eventsInDay.length === 0) {
        const freeSlot = new FreeSlotModel();
        freeSlot.dayOfWeek = i;
        freeSlot.startHour = 0;
        freeSlot.startMinute = 0;
        freeSlot.endHour = 23;
        freeSlot.endMinute = 59;
        freeSlot.startDate = this.currentWeekDays[i];
        freeSlots.push(freeSlot);
        continue;
      }

      let j = 0;
      for (; j < eventsInDay.length; j++) {
        if (j === 0) {
          if (eventsInDay[j].startHour === 0) {
            continue;
          }
          const freeSlot = new FreeSlotModel();
          freeSlot.dayOfWeek = eventsInDay[j].dayOfWeek;
          freeSlot.startHour = 0;
          freeSlot.startMinute = 0;
          freeSlot.endHour = eventsInDay[j].startHour;
          freeSlot.endMinute = eventsInDay[j].startMinute;
          freeSlot.startDate = eventsInDay[j].startDate;
          freeSlots.push(freeSlot);
        } else {
          const k = j - 1;
          if (eventsInDay[j].startHour - eventsInDay[k].endHour < 1) {
            continue;
          }
          const freeSlot = new FreeSlotModel();
          freeSlot.dayOfWeek = eventsInDay[j].dayOfWeek;
          freeSlot.startHour = eventsInDay[k].endHour;
          freeSlot.startMinute = eventsInDay[k].endMinute;
          freeSlot.endHour = eventsInDay[j].startHour;
          freeSlot.endMinute = eventsInDay[j].startMinute;
          freeSlot.startDate = eventsInDay[k].startDate;
          freeSlots.push(freeSlot);
        }
      }

      if (j > 0) {
        j--;
        if (eventsInDay[j].endHour < 23) {
          const freeSlot = new FreeSlotModel();
          freeSlot.startHour = eventsInDay[j].endHour;
          freeSlot.startMinute = eventsInDay[j].endMinute;
          freeSlot.endHour = 23;
          freeSlot.endMinute = 59;
          freeSlot.dayOfWeek = eventsInDay[j].dayOfWeek;
          freeSlot.startDate = eventsInDay[j].startDate;
          freeSlots.push(freeSlot);
        }
      }
    }
    this.data.freeSlots = freeSlots;
    this.freeSlots.next([...freeSlots]);
  }

  public addItineraryToFreeSlot(freeSlot: FreeSlotModel): void {
    const index = this.data.freeSlots.findIndex((slot) => slot.dayOfWeek === freeSlot.dayOfWeek);
    if (index >= 0) {
      this.data.freeSlots[index] = freeSlot;
      this.freeSlots.next([...this.data.freeSlots]);
    }
  }

  private updateEventData(id: string, event: Event): void {
    const index = this.data.events.findIndex((value) => value._id === id);
    if (index >= 0) {
      this.data.events[index] = event;
    }
  }

  /**
   *  Convert all date strings to date objects
   *  All date objects are converted to date string when stingified to json
   *  #####################################################################
   */
  private parseEventDates(): void {
    for (const event of this.data.events) {
      if (typeof event.startDate === 'string') {
        event.startDate = new Date(event.startDate);
        event.endDate = new Date(event.endDate);
      }
    }
  }
}
