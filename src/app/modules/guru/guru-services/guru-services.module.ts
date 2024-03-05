import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DatingRequestProgressComponent } from './dating-request-progress/dating-request-progress.component';
import { GuruDashboardComponent } from './guru-dashboard/guru-dashboard.component';
import { GuruDashboardService } from './guru-dashboard/guru-dashboard.service';
import { GuruItinerariesCardComponent } from './guru-itineraries/guru-itineraries-card/guru-itineraries-card.component';
import { GuruItinerariesComponent } from './guru-itineraries/guru-itineraries.component';
import { GuruItinerariesService } from './guru-itineraries/guru-itineraries.service';
import { GuruServicesHeaderComponent } from './guru-services-header/guru-services-header.component';
import { GuruServicesRequestComponent } from './guru-services-requests/guru-services-request/guru-services-request.component';
import { GuruServicesRequestsComponent } from './guru-services-requests/guru-services-requests.component';
import { GuruServicesRequestsService } from './guru-services-requests/guru-services-requests.service';
import { GuruServicesRoutingModule } from './guru-services-routing.module';
import { MonthlyGoalCardComponent } from './monthly-goal-card/monthly-goal-card.component';

import { MapModule } from '../../shared/components/map/map.module';
import { DatingAccountComponent } from './guru-clients/dating-account/dating-account.component';
import { GuruClientCardComponent } from './guru-clients/guru-client-card/guru-client-card.component';
import { GuruClientComponent } from './guru-clients/guru-client/guru-client.component';
import { GuruClientsComponent } from './guru-clients/guru-clients.component';
import { GuruClientsService } from './guru-clients/guru-clients.service';
import { GuruServicesFooterModule } from './guru-services-footer/guru-services-footer.module';
import { GuruServicesComponent } from './guru-services.component';

@NgModule({
  declarations: [
    GuruDashboardComponent,
    MonthlyGoalCardComponent,
    GuruItinerariesComponent,
    GuruServicesHeaderComponent,
    GuruItinerariesCardComponent,
    GuruDashboardComponent,
    MonthlyGoalCardComponent,
    GuruServicesRequestsComponent,
    GuruServicesRequestComponent,
    DatingRequestProgressComponent,
    GuruClientsComponent,
    GuruClientComponent,
    GuruClientCardComponent,
    DatingAccountComponent,
    GuruServicesComponent,
  ],
  imports: [
    CommonModule,
    GuruServicesRoutingModule,
    IonicModule,
    TranslateModule,
    MatMenuModule,
    MatButtonModule,
    MatRippleModule,
    MapModule,
    MatIconModule,
    GuruServicesFooterModule,
  ],
  providers: [GuruDashboardService, GuruItinerariesService, GuruServicesRequestsService, GuruClientsService],
})
export class GuruServicesModule {}
