import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatingAccountComponent } from './guru-clients/dating-account/dating-account.component';
import { GuruClientComponent } from './guru-clients/guru-client/guru-client.component';
import { GuruClientsComponent } from './guru-clients/guru-clients.component';
import { GuruDashboardComponent } from './guru-dashboard/guru-dashboard.component';
import { GuruItinerariesComponent } from './guru-itineraries/guru-itineraries.component';
import { GuruServicesRequestsComponent } from './guru-services-requests/guru-services-requests.component';
import { GuruServicesComponent } from './guru-services.component';

const routes: Routes = [
  {
    path: '',
    component: GuruServicesComponent,
    children: [
      {
        path: 'guru-profile',
        loadChildren: (): Promise<any> => import('./guru-profile/guru-profile.module').then((m) => m.GuruProfilePageModule),
        data: { activeTab: 'profile' },
      },
      { path: '', component: GuruDashboardComponent, data: { activeTab: 'home' } },
      { path: 'requests', component: GuruServicesRequestsComponent, data: { activeTab: 'requests' } },
      { path: 'itineraries', component: GuruItinerariesComponent, data: { activeTab: 'itineraries' } },
      { path: 'clients', component: GuruClientsComponent, data: { activeTab: 'clients' } },
      { path: 'clients/client/:id', component: GuruClientComponent, data: { activeTab: 'clients' } },
      { path: 'clients/client/account/:id', component: DatingAccountComponent, data: { activeTab: 'clients' } },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuruServicesRoutingModule {}
