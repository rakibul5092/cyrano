import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaptureMediaPage } from './capture-media.page';

const routes: Routes = [
  {
    path: 'driving-license',
    component: CaptureMediaPage,
  },
  {
    path: 'driving-license/:side',
    component: CaptureMediaPage,
  },
  {
    path: '**',
    redirectTo: 'driving-license',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaptureMediaPageRoutingModule {}
