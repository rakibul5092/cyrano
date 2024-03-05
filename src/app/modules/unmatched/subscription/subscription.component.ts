import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionComponent {
  commonSubscriptionFeatures = [
    {
      text: 'UNMATCHED.SUBSCRIPTION.GET_STARTED_WITH_DATES.TEXT',
      highlight: 'UNMATCHED.SUBSCRIPTION.GET_STARTED_WITH_DATES.HIGHLIGHT',
    },
    {
      text: 'UNMATCHED.SUBSCRIPTION.BOOK_GURU.TEXT',
      highlight: 'UNMATCHED.SUBSCRIPTION.BOOK_GURU.HIGHLIGHT',
    },
    {
      text: 'UNMATCHED.SUBSCRIPTION.ACCESS_TO_ALL_COURSES.TEXT',
      highlight: 'UNMATCHED.SUBSCRIPTION.ACCESS_TO_ALL_COURSES.HIGHLIGHT',
    },
  ];

  noAdFeature = {
    text: 'UNMATCHED.SUBSCRIPTION.NO_ADS.TEXT',
    highlight: 'UNMATCHED.SUBSCRIPTION.NO_ADS.HIGHLIGHT',
  };

  limitedAdFeature = {
    text: 'UNMATCHED.SUBSCRIPTION.LIMITED_ADS.TEXT',
    highlight: 'UNMATCHED.SUBSCRIPTION.LIMITED_ADS.HIGHLIGHT',
  };

  trialSubscriptionData = {
    name: 'UNMATCHED.SUBSCRIPTION.TRIAL',
    price: 'UNMATCHED.SUBSCRIPTION.FREE',
    features: [...this.commonSubscriptionFeatures],
    recommended: false,
    isPlatinum: false,
  };

  premiumSubscriptionData = {
    name: 'UNMATCHED.SUBSCRIPTION.PREMIUM',
    price: '$40',
    priceUnit: 'UNMATCHED.SUBSCRIPTION.MONTH',
    features: [...this.commonSubscriptionFeatures, this.limitedAdFeature],
    recommended: true,
    isPlatinum: false,
  };

  platinumSubscriptionData = {
    name: 'UNMATCHED.SUBSCRIPTION.PLATINUM',
    price: '$69',
    priceUnit: 'UNMATCHED.SUBSCRIPTION.MONTH',
    features: [...this.commonSubscriptionFeatures, this.noAdFeature],
    recommended: false,
    isPlatinum: true,
  };

  /** */
  constructor() {}
}
