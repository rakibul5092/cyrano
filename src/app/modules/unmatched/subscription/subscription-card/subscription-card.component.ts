import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface SubscriptonData {
  name: string;
  price: string;
  priceUnit?: string;
  features: { text: string; highlight: string }[];
  recommended: boolean;
  isPlatinum: boolean;
  buttonClass?: string;
}

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionCardComponent {
  @Input()
  subscriptionData: SubscriptonData;

  /** */
}
