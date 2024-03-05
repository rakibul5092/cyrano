import { Component } from '@angular/core';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  public selectedComponent = 2;
  public statistics: any[] = [
    { type: 'GURU.EARNINGS', value: 240, unit: '$', maxValue: 500 },
    { type: 'GURU.CLIENTS', value: 36, unit: '', maxValue: 80 },
    { type: 'GURU.CLIENTS', value: 36, unit: '', maxValue: 80 },
  ];

  private headerTitle: string = 'MONEY_STATISTICS';

  /**
   *
   * @param guruHeaderService
   */
  constructor(private guruHeaderService: GuruHeaderService) {}

  /**
   * Initializing header title
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }

  /**
   * On switch statistics component
   */
  public changeStatistics(): void {
    this.selectedComponent = this.selectedComponent === 1 ? 2 : 1;
  }
}
