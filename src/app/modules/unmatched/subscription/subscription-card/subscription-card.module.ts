import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiColoredTextModule } from 'nextsapien-component-lib';
import { SubscriptionCardComponent } from './subscription-card.component';

@NgModule({
  declarations: [SubscriptionCardComponent],
  imports: [CommonModule, IonicModule, TranslateModule, MultiColoredTextModule],
  exports: [SubscriptionCardComponent],
})
export class SubscriptionCardModule {}
