import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PaymentSuccessfulComponent } from './payment-successful/payment-successful.component';

import { PaymentPage } from './payment.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage,
  },
  {
    path: 'payment-method',
    component: PaymentMethodComponent,
  },
  {
    path: 'success',
    component: PaymentSuccessfulComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
