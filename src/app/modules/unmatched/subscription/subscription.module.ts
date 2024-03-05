import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../../layout/layout.module';
import { SubscriptionCardModule } from './subscription-card/subscription-card.module';
import { SubscriptionComponent } from './subscription.component';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [CommonModule, IonicModule, LayoutModule, TranslateModule, SubscriptionCardModule],
})
export class SubscriptionModule {}
