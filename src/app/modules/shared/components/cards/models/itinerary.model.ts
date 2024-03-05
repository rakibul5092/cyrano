export interface ItineraryCardInterface {
  name: string;
  icon: string;
}

export class Itinerary {
  dateTime: string;
  name: string;
  description: string;
  mainPlace: ItineraryCardInterface;
  places: ItineraryCardInterface[];
}
