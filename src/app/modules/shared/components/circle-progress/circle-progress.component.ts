import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
})
export class CircleProgressComponent {
  @Input() prefix = '$';
  @Input() suffix = '';
  @Input() value = 240;
  @Input() max = 100;
  @Input() imageUrl = '/assets/images/woman.jpg';
  private pathLength = 393.72802734375;

  /**  */
  constructor() {}

  /**
   * @returns Calucalated value
   */
  public calcValue(): number {
    return (1 - this.value / this.max) * this.pathLength;
  }
}
