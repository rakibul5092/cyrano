import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAccountsPageRoutingModule } from './new-accounts-routing.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { PopupModule } from 'src/app/modules/popup/popup.module';
import { SharedComponentsModule } from 'src/app/modules/shared/components/shared-components.module';
import { PaymentPageModule } from '../../payment/payment.module';
import { BillingComponent } from './billing/billing.component';
import { NewAccountsPage } from './new-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewAccountsPageRoutingModule,
    SharedComponentsModule,
    TranslateModule,
    PaymentPageModule,
    MatTooltipModule,
    PopupModule,
  ],
  declarations: [NewAccountsPage, BillingComponent],
})
export class NewAccountsPageModule {}
