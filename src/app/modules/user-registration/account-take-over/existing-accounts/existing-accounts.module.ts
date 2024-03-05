import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingAccountsPageRoutingModule } from './existing-accounts-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from 'src/app/modules/shared/components/shared-components.module';
import { AccessCodesComponent } from './access-codes/access-codes.component';
import { ExistingAccountsPage } from './existing-accounts.page';
import { PlatformsPasswordsComponent } from './platforms-passwords/platforms-passwords.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, MatIconModule, ExistingAccountsPageRoutingModule, SharedComponentsModule, TranslateModule],
  declarations: [ExistingAccountsPage, AccessCodesComponent, PlatformsPasswordsComponent],
})
export class ExistingAccountsPageModule {}
