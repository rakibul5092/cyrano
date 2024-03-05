import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputFieldModule, MultiColoredTextModule } from 'nextsapien-component-lib';
import { NgxMaskModule } from 'ngx-mask';
import { HeaderModule } from '../../user-registration/layout/header/header.module';
import { GuruRegistrationRoutingModule } from './guru-registration-routing.module';
import { GuruRegistrationComponent } from './guru-registration.component';
import { PhoneRegisterComponent } from './phone-register/phone-register.component';
import { PhoneVerifyComponent } from './phone-verify/phone-verify.component';
import { ReferralCodeComponent } from './referral-code/referral-code.component';
import { RegisterComponent } from './register/register.component';
import { UsernameComponent } from './username/username.component';

import { FormValidatorModule } from '../../../directives/form-validator/form-validator.module';
import { SsnValidatorModule } from '../../../directives/ssn-validator/ssn-validator.module';
import { DateTimeModule } from '../../shared/components/date-time/date-time.module';

import { MatInputModule } from '@angular/material/input';
import { PasswordValidatorModule } from 'src/app/directives/password/password-validator.module';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { PhoneSignupFormModule } from '../../user-registration/phone-signup/phone-signup-form/phone-signup-form.module';
import { VerificationModule } from '../../user-registration/phone-verification/verification/verification.module';
import { WelcomeScreenModule } from '../../user-registration/signup-welcome/welcome-screen/welcome-screen.module';
import { AlmostReadyComponent } from './almost-ready/almost-ready.component';
import { BackgroundCheckComponent } from './background-check/background-check.component';
import { GuruRegistrationHeaderComponent } from './guru-registration-header/guru-registration-header.component';
import { MoneyGoalsComponent } from './money-goals/money-goals.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    RegisterComponent,
    PhoneRegisterComponent,
    PhoneVerifyComponent,
    UsernameComponent,
    ReferralCodeComponent,
    WelcomeComponent,
    GuruRegistrationComponent,
    GuruRegistrationHeaderComponent,
    BackgroundCheckComponent,
    MoneyGoalsComponent,
    AlmostReadyComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    GuruRegistrationRoutingModule,
    MultiColoredTextModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HeaderModule,
    PhoneSignupFormModule,
    VerificationModule,
    FormValidatorModule,
    SsnValidatorModule,
    MatButtonModule,
    DateTimeModule,
    NgxMaskModule.forRoot(),
    WelcomeScreenModule,
    PasswordValidatorModule,
    MatInputModule,
    InputFieldModule,
  ],
  providers: [HeaderService],
})
export class GuruRegistrationModule {}
