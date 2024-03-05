import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-upcoming-date-card',
  templateUrl: './upcoming-date-card.component.html',
  styleUrls: ['./upcoming-date-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingDateCardComponent implements OnInit {
  @Input()
  upcomingDate: { date: string; hasDate: boolean };

  dayName: string;

  dayNumber: string | number;

  /** */

  /** */
  ngOnInit(): void {
    const date = new Date(this.upcomingDate.date);
    this.dayNumber = date.getDate();
    this.dayName = this.upcomingDate.hasDate ? this.getDayName(date) : this.getDayName(date, 'short');
  }

  /**
   *
   * @param date Date object
   * @param type long|short|narrow
   * @returns date using the locale settings
   */
  private getDayName(date: Date, type: 'long' | 'short' | 'narrow' = 'long'): string {
    return date.toLocaleDateString('en', { weekday: type });
  }
}
