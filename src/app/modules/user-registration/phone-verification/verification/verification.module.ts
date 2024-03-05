import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OtpInputModule } from 'nextsapien-component-lib';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { VerificationComponent } from './verification.component';

@NgModule({
  declarations: [VerificationComponent],
  imports: [SubmitOnEnterModule, IonicModule, CommonModule, ReactiveFormsModule, TranslateModule, OtpInputModule],
  exports: [VerificationComponent],
})
export class VerificationModule {}
