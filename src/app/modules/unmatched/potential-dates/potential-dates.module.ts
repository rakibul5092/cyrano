import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileCardModule, ProfileHeaderModule } from 'nextsapien-component-lib';
import { SwiperModule } from 'swiper/angular';
import { LayoutModule } from '../../layout/layout.module';
import { DateAccountComponent } from './date-account/date-account.component';
import { PotentialDatesHomeComponent } from './potential-dates-home/potential-dates-home.component';
import { PotentialDatesLocationsComponent } from './potential-dates-locations/potential-dates-locations.component';
import { PotentialDatesRoutesModule } from './potential-dates-routes.module';
import { PotentialDatesSelectGuruComponent } from './potential-dates-select-guru/potential-dates-select-guru.component';
import { PotentialDatesSuccessComponent } from './potential-dates-success/potential-dates-success.component';
import { PotentialDatesComponent } from './potential-dates.component';

@NgModule({
  declarations: [
    PotentialDatesComponent,
    PotentialDatesHomeComponent,
    PotentialDatesSelectGuruComponent,
    PotentialDatesLocationsComponent,
    PotentialDatesSuccessComponent,
    DateAccountComponent,
  ],
  imports: [CommonModule, PotentialDatesRoutesModule, IonicModule, TranslateModule, ProfileCardModule, ProfileHeaderModule, LayoutModule, SwiperModule],
})
export class PotentialDatesModule {}
