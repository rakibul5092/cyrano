import { ItinerariesModel } from '../models/itineraries.model';

export class GuruItinerariesService {
  /**
   * get Itineraries Data
   */
  public getItineraries(): ItinerariesModel[] {
    return [
      {
        image: 'assets/images/itineraries.png',
        title: 'Epic group meetup',
        places: 4,
        date: new Date(),
        distance: 11.2,
        time: new Date(),
      },
      {
        image: 'assets/images/itineraries.png',
        title: 'Old school itinerary',
        places: 4,
        date: new Date(),
        distance: 11.2,
        time: new Date(),
      },
      {
        image: 'assets/images/itineraries.png',
        title: 'Epic group meetup',
        places: 4,
        date: new Date(),
        distance: 11.2,
        time: new Date(),
      },
      {
        image: 'assets/images/itineraries.png',
        title: 'Old school itinerary',
        places: 4,
        date: new Date(),
        distance: 11.2,
        time: new Date(),
      },
    ];
  }
}
