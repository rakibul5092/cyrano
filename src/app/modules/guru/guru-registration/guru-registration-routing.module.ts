import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmostReadyComponent } from './almost-ready/almost-ready.component';
import { BackgroundCheckComponent } from './background-check/background-check.component';
import { GuruRegistrationComponent } from './guru-registration.component';
import { MoneyGoalsComponent } from './money-goals/money-goals.component';
import { PhoneRegisterComponent } from './phone-register/phone-register.component';
import { PhoneVerifyComponent } from './phone-verify/phone-verify.component';
import { ReferralCodeComponent } from './referral-code/referral-code.component';
import { RegisterComponent } from './register/register.component';
import { UsernameComponent } from './username/username.component';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [
  {
    path: '',
    component: GuruRegistrationComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'phone',
        component: PhoneRegisterComponent,
      },
      {
        path: 'verify',
        component: PhoneVerifyComponent,
      },
      {
        path: 'username',
        component: UsernameComponent,
      },
      {
        path: 'referral-code',
        component: ReferralCodeComponent,
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      { path: 'background-check', component: BackgroundCheckComponent },
      { path: 'money-goals', component: MoneyGoalsComponent },
      { path: 'almost-ready', component: AlmostReadyComponent },
      {
        path: 'account-verification',
        loadChildren: (): Promise<any> => import('./account-verification/account-verification.module').then((m) => m.AccountVerificationPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuruRegistrationRoutingModule {}
