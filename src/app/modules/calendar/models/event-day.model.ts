import { Event } from './event.model';
import { FreeSlotModel } from './free-slot.model';

export class EventDay {
  date?: Date;
  events: Event[];
  freeSlots?: FreeSlotModel[];
}
