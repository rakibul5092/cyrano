import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-progress',
  templateUrl: './date-progress.component.html',
  styleUrls: ['./date-progress.component.scss'],
})
export class DateProgressComponent {
  @Input()
  percentage = 20;

  percent = 0;

  circle: any;

  /** */
  constructor() {}
}
