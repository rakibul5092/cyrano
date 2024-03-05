import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';
import { PaymentPage } from './payment.page';

@NgModule({
  imports: [SubmitOnEnterModule, CommonModule, FormsModule, IonicModule, PaymentPageRoutingModule, ReactiveFormsModule, SharedComponentsModule, MatDialogModule, TranslateModule],
  declarations: [PaymentPage, PaymentMethodComponent, PaymentSuccessfulComponent],
})
export class PaymentPageModule {}
