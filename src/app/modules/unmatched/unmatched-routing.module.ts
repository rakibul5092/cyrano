import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UnmatchedAccountInfoComponent } from './unmatched-account-info/unmatched-account-info.component';
import { UnmatchedAccountLogComponent } from './unmatched-account-log/unmatched-account-log.component';
import { UnmatchedAccountMetaComponent } from './unmatched-account-meta/unmatched-account-meta.component';
import { UnmatchedAccountComponent } from './unmatched-account/unmatched-account.component';

const routes: Routes = [
  { path: '', component: UnmatchedAccountComponent },
  { path: 'info', component: UnmatchedAccountInfoComponent },
  { path: 'log', component: UnmatchedAccountLogComponent },
  {
    path: 'potential-dates',
    loadChildren: (): Promise<any> => import('./potential-dates/potential-dates.module').then((m) => m.PotentialDatesModule),
  },
  { path: 'meta', component: UnmatchedAccountMetaComponent },
  { path: 'dashboard', loadChildren: (): Promise<any> => import('./dashboard/dashboard.module').then((m) => m.DashboardModule) },
  {
    path: 'subscription',
    component: SubscriptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnmatchedRoutingModule {}
