import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { PhoneSignupFormComponent } from './phone-signup-form.component';
import { TelInputModule } from 'nextsapien-component-lib';

@NgModule({
  declarations: [PhoneSignupFormComponent],
  imports: [SubmitOnEnterModule, IonicModule, CommonModule, ReactiveFormsModule, TranslateModule, TelInputModule],
  exports: [PhoneSignupFormComponent],
})
export class PhoneSignupFormModule {}
