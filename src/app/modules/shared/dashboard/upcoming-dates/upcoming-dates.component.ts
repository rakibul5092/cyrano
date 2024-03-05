import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingDatesComponent implements OnInit {
  today = new Date();

  dates = [];

  /***/

  /***/
  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      const currentDate = this.today;
      currentDate.setDate(currentDate.getDate() + 1);

      const random = Math.floor(Math.random() * 2);

      this.dates.push({
        date: currentDate.toDateString(),
        hasDate: random === 1,
        dash: false,
      });
    }

    this.dates.forEach((value, index) => {
      if (index >= 1 && index < this.dates.length - 1) {
        if (this.dates[index - 1].hasDate === false && this.dates[index].hasDate === false && this.dates[index + 1].hasDate === false) {
          this.dates[index].dash = true;
        } else {
          this.dates[index].dash = false;
        }
      }
    });
  }
}
