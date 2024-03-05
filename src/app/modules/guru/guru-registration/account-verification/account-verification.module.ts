import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountVerificationPageRoutingModule } from './account-verification-routing.module';

import { AccountVerificationPage } from './account-verification.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountVerificationPageRoutingModule, TranslateModule],
  declarations: [AccountVerificationPage],
})
export class AccountVerificationPageModule {}
