import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessCodesComponent } from './access-codes/access-codes.component';

import { ExistingAccountsPage } from './existing-accounts.page';
import { PlatformsPasswordsComponent } from './platforms-passwords/platforms-passwords.component';

const routes: Routes = [
  {
    path: '',
    component: ExistingAccountsPage,
  },
  {
    path: 'access-codes',
    component: AccessCodesComponent,
  },
  {
    path: 'change-platforms-password',
    component: PlatformsPasswordsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingAccountsPageRoutingModule {}
