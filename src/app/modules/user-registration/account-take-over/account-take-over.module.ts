import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

import { AccountTakeOverPageRoutingModule } from './account-take-over-routing.module';

import { AccountTakeOverPage } from './account-take-over.page';

import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { DatingAccountSetupComponent } from './dating-account-setup/dating-account-setup.component';

@NgModule({
  imports: [SubmitOnEnterModule, CommonModule, FormsModule, ReactiveFormsModule, IonicModule, AccountTakeOverPageRoutingModule, TranslateModule, SharedComponentsModule],
  declarations: [AccountTakeOverPage, DatingAccountSetupComponent],
})
export class AccountTakeOverPageModule {}
