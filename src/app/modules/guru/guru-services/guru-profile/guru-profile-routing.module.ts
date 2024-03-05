import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuruProfilePage } from './guru-profile.page';

const routes: Routes = [
  {
    path: '',
    component: GuruProfilePage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuruProfilePageRoutingModule {}
