import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuruProfilePageRoutingModule } from './guru-profile-routing.module';

import { GuruProfilePage } from './guru-profile.page';
import { ProfileHeaderModule } from 'nextsapien-component-lib';
import { GuruReviewCardComponent } from '../guru-review-card/guru-review-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { GuruServicesFooterModule } from '../guru-services-footer/guru-services-footer.module';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  imports: [PipesModule, CommonModule, FormsModule, IonicModule, GuruProfilePageRoutingModule, ProfileHeaderModule, TranslateModule, GuruServicesFooterModule],
  declarations: [GuruProfilePage, GuruReviewCardComponent],
})
export class GuruProfilePageModule {}
