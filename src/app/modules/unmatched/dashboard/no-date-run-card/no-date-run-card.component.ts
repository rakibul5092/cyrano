import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-date-run-card',
  templateUrl: './no-date-run-card.component.html',
  styleUrls: ['./no-date-run-card.component.scss'],
})
export class NoDateRunCardComponent implements OnInit {
  @Input() cardDetails: any;
  public startDay: number;
  public startWeekDay: string;
  public endDay: number;
  public endWeekDay: string;

  /**
   * @constructor Represents the component instance for NoDateRunComponent
   */

  /**
   * @Method implements the Oninit interface
   */
  ngOnInit(): void {
    const startDate = new Date(this.cardDetails.startDate.date);
    const endDate = new Date(this.cardDetails.endDate.date);
    this.startDay = startDate.getDate();
    this.startWeekDay = startDate.toLocaleDateString('en', { weekday: 'short' });
    this.endDay = endDate.getDate();
    this.endWeekDay = endDate.toLocaleDateString('en', { weekday: 'short' });
  }
}
