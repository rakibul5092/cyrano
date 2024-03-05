import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';

import { NewAccountsPage } from './new-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: NewAccountsPage,
  },
  {
    path: 'billing',
    component: BillingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAccountsPageRoutingModule {}
