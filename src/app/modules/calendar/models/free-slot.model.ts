import { Itinerary } from '../../shared/components/cards/models/itinerary.model';

export class FreeSlotModel {
  dayOfWeek: number;
  startDate: string | Date;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  itinerary?: Itinerary;
  location?: string;
}
