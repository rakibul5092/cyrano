import { Component, Input } from '@angular/core';
import { IReview } from 'src/app/models/review.interface';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-guru-review-card',
  templateUrl: './guru-review-card.component.html',
  styleUrls: ['./guru-review-card.component.scss'],
})
export class GuruReviewCardComponent {
  @Input() reviewData: IReview;
  public icons = this.commonUtil.icons;
  constructor(private commonUtil: CommonUtilService) {}
}
