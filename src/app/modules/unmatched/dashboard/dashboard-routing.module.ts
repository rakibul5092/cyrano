import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Dashboard2Component } from './dashboard2.component';
import { Dashboard3Component } from './dashboard3.component';
import { Dashboard4Component } from './dashboard4.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '1',
    redirectTo: '',
  },
  {
    path: '2',
    component: Dashboard2Component,
  },
  {
    path: '3',
    component: Dashboard3Component,
  },
  {
    path: '4',
    component: Dashboard4Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
