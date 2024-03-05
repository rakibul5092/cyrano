import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CircleProgressModule, MultiColoredTextModule } from 'nextsapien-component-lib';
import { LayoutModule } from '../../layout/layout.module';
import { UtilModule } from '../utility-components/util.module';
import { ClientsBreakdownComponent } from './clients-breakdown/clients-breakdown.component';
import { MonthlyBreakdownComponent } from './monthly-breakdown/monthly-breakdown.component';
import { StatisticsComponent } from './statistics.component';
@NgModule({
  declarations: [StatisticsComponent, MonthlyBreakdownComponent, ClientsBreakdownComponent],
  imports: [CommonModule, IonicModule, UtilModule, TranslateModule, CircleProgressModule, MultiColoredTextModule, LayoutModule],
})
export class StatisticsModule {}
