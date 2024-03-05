import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UnmatchedAccountInfoComponent } from './unmatched-account-info/unmatched-account-info.component';
import { UnmatchedAccountLogComponent } from './unmatched-account-log/unmatched-account-log.component';
import { UnmatchedAccountMetaComponent } from './unmatched-account-meta/unmatched-account-meta.component';
import { UnmatchedAccountComponent } from './unmatched-account/unmatched-account.component';
import { UnmatchedRoutingModule } from './unmatched-routing.module';

@NgModule({
  declarations: [UnmatchedAccountComponent, UnmatchedAccountLogComponent, UnmatchedAccountInfoComponent, UnmatchedAccountMetaComponent],
  imports: [
    CommonModule,
    UnmatchedRoutingModule,
    IonicModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    TranslateModule,
    LayoutModule,
    SubscriptionModule,
  ],
})
export class UnmatchedModule {}
