import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiColoredTextModule } from 'nextsapien-component-lib';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { Dashboard2Component } from './dashboard2.component';
import { Dashboard3Component } from './dashboard3.component';
import { Dashboard4Component } from './dashboard4.component';
import { DateProgressModule } from './date-progress/date-progress.module';
import { NoDateModule } from './no-date/no-date.module';
import { PotentialDatesModule } from './potential-dates/potential-dates.module';
import { UpcomingDatesModule } from './upcoming-dates/upcoming-dates.module';
import { UpdateInfoPageModule } from './update-info-page/update-info-page.module';

@NgModule({
  declarations: [DashboardComponent, Dashboard3Component, Dashboard2Component, Dashboard4Component],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UpcomingDatesModule,
    DateProgressModule,
    PotentialDatesModule,
    IonicModule,
    NoDateModule,
    UpdateInfoPageModule,
    TranslateModule,
    MultiColoredTextModule,
  ],
})
export class DashboardModule {}
