import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule, CircleProgressModule, MultiColoredTextModule, ProfileCardModule, ProfileHeaderModule } from 'nextsapien-component-lib';
import { SwiperModule } from 'swiper/angular';
import { LayoutModule } from '../layout/layout.module';
import { AccountComponent } from './account/account.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { CashoutEarningsComponent } from './cashout-earnings/cashout-earnings.component';
import { ClientDashboardModule } from './client-dashboard/client-dashboard.module';
import { ClientRequestComponent } from './client-request/client-request.component';
import { ClientRequestsComponent } from './client-requests/client-requests.component';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients/clients.component';
import { GuruDashboardComponent } from './guru-dashboard/guru-dashboard.component';
import { GuruHeaderModule } from './guru-header/guru-header.module';
import { GuruRegistrationModule } from './guru-registration/guru-registration.module';
import { GuruRoutingModule } from './guru-routing.module';
import { GuruComponent } from './guru.component';
import { MetaInformationComponent } from './meta-information/meta-information.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StatisticsModule } from './statistics/statistics.module';
import { UpdateInformationComponent } from './update-information/update-information.component';
import { UtilModule } from './utility-components/util.module';

@NgModule({
  declarations: [
    GuruDashboardComponent,
    GuruComponent,
    ClientsComponent,
    ClientComponent,
    ClientRequestsComponent,
    ClientRequestComponent,
    AccountComponent,
    CashoutEarningsComponent,
    NotificationsComponent,
    ActivityLogComponent,
    UpdateInformationComponent,
    MetaInformationComponent,
  ],
  imports: [
    GuruRoutingModule,
    CommonModule,
    GuruRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatButtonModule,
    TranslateModule,
    UtilModule,
    ClientDashboardModule,
    StatisticsModule,
    MatIconModule,
    ProfileCardModule,
    ProfileHeaderModule,
    CircleProgressModule,
    CheckboxModule,
    MultiColoredTextModule,
    GuruHeaderModule,
    LayoutModule,
    SwiperModule,
    MatChipsModule,
    GuruRegistrationModule,
    MatTooltipModule,
  ],
})
export class GuruModule {}
