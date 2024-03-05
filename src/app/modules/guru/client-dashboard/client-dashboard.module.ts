import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileHeaderModule } from 'nextsapien-component-lib';
import { LayoutModule } from '../../layout/layout.module';
import { UtilModule } from '../utility-components/util.module';
import { ClientBasicInfoComponent } from './client-basic-info/client-basic-info.component';
import { ClientContextComponent } from './client-context/client-context.component';
import { ClientDashboardComponent } from './client-dashboard.component';
import { ClientEventsComponent } from './client-events/client-events.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientParticularsComponent } from './client-particulars/client-particulars.component';
import { ClientScheduleComponent } from './client-schedule/client-schedule.component';
@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientBasicInfoComponent,
    ClientContextComponent,
    ClientOrdersComponent,
    ClientParticularsComponent,
    ClientScheduleComponent,
    ClientEventsComponent,
  ],
  imports: [CommonModule, IonicModule, UtilModule, TranslateModule, ProfileHeaderModule, LayoutModule],
})
export class ClientDashboardModule {}
