import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CashoutEarningsComponent } from './cashout-earnings/cashout-earnings.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientRequestComponent } from './client-request/client-request.component';
import { ClientRequestsComponent } from './client-requests/client-requests.component';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { GuruDashboardComponent } from './guru-dashboard/guru-dashboard.component';
import { GuruComponent } from './guru.component';
import { MetaInformationComponent } from './meta-information/meta-information.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateInformationComponent } from './update-information/update-information.component';

const routes: Routes = [
  {
    path: '',
    component: GuruComponent,
    children: [
      { path: '', component: GuruDashboardComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'client/:id', component: ClientComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'client-requests', component: ClientRequestsComponent },
      { path: 'client-request/:id', component: ClientRequestComponent },
      { path: 'client-dashboard/:id', component: ClientDashboardComponent },
      { path: 'account', component: AccountComponent },
      { path: 'cashout-earnings', component: CashoutEarningsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'update-information', component: UpdateInformationComponent },
      { path: 'meta-information', component: MetaInformationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuruRoutingModule {}
