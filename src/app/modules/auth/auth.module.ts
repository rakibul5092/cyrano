import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { OtpInputModule } from 'nextsapien-component-lib';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';

import { DashedCheckboxModule, InputFieldModule, TelInputModule } from 'nextsapien-component-lib';
import { NgxTelInputModule } from 'src/app/directives/ngx-tel-input/ngx-tel-input.module';
import { FormValidatorModule } from '../../directives/form-validator/form-validator.module';
import { PasswordValidatorModule } from '../../directives/password/password-validator.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { HeaderModule } from '../user-registration/layout/header/header.module';
import { AuthHeaderModule } from './auth-header/auth-header.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthSocialComponent } from './auth-social/auth-social.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AccountTypeComponent } from './register/account-type/account-type.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthSocialComponent, AccountTypeComponent, ResetPasswordComponent, VerificationCodeComponent, ForgotPasswordComponent],
  imports: [
    SubmitOnEnterModule,
    CommonModule,
    AuthRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    MatMenuModule,
    MatTooltipModule,
    AuthHeaderModule,
    PasswordValidatorModule,
    FormValidatorModule,
    NgxTelInputModule,
    HeaderModule,
    TelInputModule,
    OtpInputModule,
    SharedComponentsModule,
    InputFieldModule,
    DashedCheckboxModule,
  ],
})
export class AuthModule {}
