import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';
import { AddItineraryComponent } from '../components/add-itinerary/add-itinerary.component';
import { AddLocationComponent } from '../components/add-location/add-location.component';
import { FreeSlotModel } from '../models/free-slot.model';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-free-slots',
  templateUrl: './free-slots.page.html',
  styleUrls: ['./free-slots.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreeSlotsPage implements OnInit {
  public freeSlots: FreeSlotModel[];
  public currentWeekDays = this.eventsService.currentWeekDays;

  constructor(
    private eventsService: EventsService,
    private modalCtrl: ModalController,
    private userRegistrationService: UserRegistrationService,
    private headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    this.freeSlots = this.userRegistrationService.freeSlots;
  }

  ionViewWillEnter = (): void => {
    this.headerService.showCalendar$.next({ visible: true, route: '' });
  };

  ionViewWillLeave = (): void => {
    this.headerService.showCalendar$.next({ visible: false, route: '' });
  };

  public dayHasEvents(events: FreeSlotModel[], date: Date): boolean {
    return events.findIndex((value) => value.dayOfWeek === date.getDay()) >= 0 ? true : false;
  }

  public isWorkDay(date: Date): boolean {
    const day = date.getDay();
    return day > 0 && day < 6;
  }

  public filterIntoDay(freeSlot: FreeSlotModel, date: Date): boolean {
    return freeSlot.dayOfWeek === date.getDay();
  }

  public async addItinerary(slot: FreeSlotModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddItineraryComponent,
      cssClass: 'modal-class',
      mode: 'ios',
      breakpoints: [0, 0.8, 0.9],
      initialBreakpoint: 0.8,
      handleBehavior: 'cycle',
      componentProps: { data: slot },
    });

    await modal.present();
    const dataSubmitted = await modal.onDidDismiss();

    if (dataSubmitted.role === 'submit') {
      const newFreeSlot = dataSubmitted.data as FreeSlotModel;
      const itinerary = {
        image: 'url',
        name: dataSubmitted.data.title,
        mainPlace: { name: dataSubmitted.data.place, icon: 'cyrano cyrano-Palace' },
        places: [{ name: dataSubmitted.data.place, icon: 'cyrano cyrano-Palace' }],
        dateTime: dataSubmitted.data.date,
        description: dataSubmitted.data.description,
        time: new Date(),
      };

      newFreeSlot.itinerary = itinerary;
      this.eventsService.addItineraryToFreeSlot(newFreeSlot);
    }
  }

  public async addLocation(slot: FreeSlotModel): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddLocationComponent,
      cssClass: 'modal-class',
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
    });

    await modal.present();
  }

  public onComplete() {
    this.userRegistrationService.routeToNextPage({}, 'complete').subscribe();
  }
}
