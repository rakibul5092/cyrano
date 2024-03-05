import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { CardExpiryComponent } from './card-expiry/card-expiry.component';
import { CardInputComponent } from './card-input/card-input.component';
import { CircleProgressComponent } from './circle-progress/circle-progress.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DashLoaderComponent } from './dash-loader/dash-loader.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { SheetModalHeaderComponent } from './sheet-modal-header/sheet-modal-header.component';
import { TextMarkComponent } from './text-mark/text-mark.component';

@NgModule({
  declarations: [
    CardInputComponent,
    DropdownComponent,
    TextMarkComponent,
    CardExpiryComponent,
    MarqueeComponent,
    DashLoaderComponent,
    SheetModalHeaderComponent,
    ConfirmModalComponent,
    CircleProgressComponent,
  ],
  imports: [SubmitOnEnterModule, CommonModule, IonicModule, TranslateModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatRippleModule],
  exports: [
    CardInputComponent,
    DropdownComponent,
    TextMarkComponent,
    CardExpiryComponent,
    MarqueeComponent,
    DashLoaderComponent,
    SheetModalHeaderComponent,
    ConfirmModalComponent,
    CircleProgressComponent,
  ],
})
export class SharedComponentsModule {}
