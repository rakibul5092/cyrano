import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-range-meter',
  templateUrl: './range-meter.component.html',
  styleUrls: ['./range-meter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeMeterComponent implements OnChanges {
  @Input() disabled = false;
  @Input() public percentage = 0;
  @Input() loading$: Observable<boolean>;
  @Output() next = new EventEmitter();
  public angle = 73;
  public srcPath: string = 'assets/icon/unmatched-registration/prefered-date-range-hard.svg';

  ngOnChanges(): void {
    this.calculateAngle();
  }

  /**
   * Continue to next component event emitter
   */
  public onNext(): void {
    this.next.emit();
  }

  /**
   * Calculate meter position with rotation angle
   */
  private calculateAngle(): void {
    this.angle = 360 - this.percentage * 2.05;
    if (this.angle < 225) this.srcPath = 'assets/icon/unmatched-registration/prefered-date-range-easy.svg';
    if (this.angle > 224 && this.angle < 281) this.srcPath = 'assets/icon/unmatched-registration/prefered-date-range-moderate.svg';
    if (this.angle > 280) this.srcPath = 'assets/icon/unmatched-registration/prefered-date-range-hard.svg';
  }
}
