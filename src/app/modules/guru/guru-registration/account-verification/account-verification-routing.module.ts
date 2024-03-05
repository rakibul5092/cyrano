import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountVerificationPage } from './account-verification.page';

const routes: Routes = [
  {
    path: '',
    component: AccountVerificationPage,
  },
  {
    path: 'capture-media',
    loadChildren: () => import('./capture-media/capture-media.module').then((m) => m.CaptureMediaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountVerificationPageRoutingModule {}
