import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountTakeOverPage } from './account-take-over.page';
import { DatingAccountSetupComponent } from './dating-account-setup/dating-account-setup.component';

const routes: Routes = [
  {
    path: 'setup-dating-account',
    component: DatingAccountSetupComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: AccountTakeOverPage,
  },
  {
    path: 'new-accounts',
    loadChildren: (): Promise<any> => import('./new-accounts/new-accounts.module').then((m) => m.NewAccountsPageModule),
  },
  {
    path: 'existing-accounts',
    loadChildren: (): Promise<any> => import('./existing-accounts/existing-accounts.module').then((m) => m.ExistingAccountsPageModule),
  },
  {
    path: 'automation-requirements',
    loadChildren: (): Promise<any> => import('./automation-requirements/automation-requirements.module').then((m) => m.AutomationRequirementsModule),
  },
  {
    path: 'payment',
    loadChildren: (): Promise<any> => import('../payment/payment.module').then((m) => m.PaymentPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountTakeOverPageRoutingModule {}
