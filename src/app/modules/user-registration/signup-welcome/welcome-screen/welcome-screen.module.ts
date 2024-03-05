import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'nextsapien-component-lib';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { WelcomeScreenComponent } from './welcome-screen.component';

@NgModule({
  declarations: [WelcomeScreenComponent],
  imports: [SubmitOnEnterModule, IonicModule, CommonModule, ReactiveFormsModule, TranslateModule, CheckboxModule],
  exports: [WelcomeScreenComponent],
})
export class WelcomeScreenModule {}
