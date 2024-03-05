import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItineraryCardInterface } from '../models/itinerary.model';

@Component({
  selector: 'app-itinerary-card',
  templateUrl: './itinerary-card.component.html',
  styleUrls: ['./itinerary-card.component.scss'],
})
export class ItineraryCardComponent {
  @Input() title: string;
  @Input() dateTime: string;
  @Input() name: string;
  @Input() description: string;
  @Input() mainPlace: ItineraryCardInterface;
  @Input() places: ItineraryCardInterface[];
  @Output() editEvent = new EventEmitter<void>();

  private months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  /** */

  /** */
  public get timeFormat(): string {
    const date = new Date();
    const d = date.getDate();
    const month = date.getMonth();
    const h = date.getHours();
    const h12 = h > 12 ? h % 12 : h;
    const format = `${d} ${this.months[month]} - ${h12} ${h < 12 ? 'A.M' : 'P.M'}`;
    return format;
  }

  /** */
  public onEdit(): void {
    this.editEvent.emit();
  }
}
