import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AccountTypeComponent } from './register/account-type/account-type.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: AccountTypeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerificationCodeComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
