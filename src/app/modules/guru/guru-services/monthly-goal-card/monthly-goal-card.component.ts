import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonUtilService } from '../../../../services/common-utils.service';

@Component({
  selector: 'app-monthly-goal-card',
  templateUrl: './monthly-goal-card.component.html',
  styleUrls: ['./monthly-goal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyGoalCardComponent implements OnChanges {
  @Input() goalIcon: string;
  @Input() goalTitle: string;
  @Input() earnings: number;
  @Input() targetEarnings: number;
  @Input() progress: boolean = true;
  public progressPercentage: number;

  constructor(public commonUtilService: CommonUtilService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.progressPercentage = this.progress ? (100 * this.earnings) / this.targetEarnings : 0;
  }
}
