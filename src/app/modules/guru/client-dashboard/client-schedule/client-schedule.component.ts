import { Component, OnInit } from '@angular/core';
import { GuruHeaderService } from '../../guru-header/guru-header.service';

@Component({
  selector: 'app-client-schedule',
  templateUrl: './client-schedule.component.html',
  styleUrls: ['./client-schedule.component.scss'],
})
export class ClientScheduleComponent implements OnInit {
  // according bar chart css confiration we need to use barValue between 0-4
  public weekdays: { day: string; value: number; barValue: number }[] = [
    { day: 'Mo', value: 1, barValue: 2 },
    { day: 'Tu', value: 2, barValue: 4 },
    { day: 'We', value: 3, barValue: 3 },
    { day: 'Th', value: 4, barValue: 2 },
    { day: 'Fr', value: 5, barValue: 0 },
    { day: 'Sa', value: 6, barValue: 4 },
    { day: 'Su', value: 7, barValue: 2 },
    { day: 'Mo', value: 8, barValue: 1 },
    { day: 'Tu', value: 9, barValue: 0 },
  ];

  public measures: number[] = [8, 12, 4, 8, 12];

  private headerTitle: string = 'CLIENT_SCHEDULE';

  /**
   *
   * @param guruHeaderService
   */
  constructor(private guruHeaderService: GuruHeaderService) {}

  /***/
  ngOnInit(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }
}
