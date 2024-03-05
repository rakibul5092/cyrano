import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DateTimeComponent } from './date-time.component';

@NgModule({
  declarations: [DateTimeComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [DateTimeComponent],
})
export class DateTimeModule {}
