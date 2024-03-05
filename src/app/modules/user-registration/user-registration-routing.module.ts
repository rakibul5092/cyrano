import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesVsSwipesComponent } from '../unmatched-account-setup/preferences-vs-swipes/preferences-vs-swipes.component';
import { SummarySectionComponent } from '../unmatched-account-setup/summary-section/summary-section.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AgeAndHeightComponent } from './age-and-height/age-and-height.component';
import { DatePreferencesComponent } from './date-preferences/date-preferences.component';
import { FaceAndEthnicityComponent } from './face-and-ethnicity/face-and-ethnicity.component';
import { GoalsAndInterestsComponent } from './goals-and-interests/goals-and-interests.component';
import { UserRegistrationGuard } from './guards/user-registration.guard';
import { ImplicitSwipesComponent } from './implicit-swipes/implicit-swipes.component';
import { InterestedInComponent } from './interested-in/interested-in.component';
import { LocationPermissionComponent } from './location-permission/location-permission.component';
import { MapsLocationComponent } from './maps-location/maps-location.component';
import { MyInterestsComponent } from './my-interests/my-interests.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { PhoneSignupComponent } from './phone-signup/phone-signup.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { RackAndAssComponent } from './rack-and-ass/rack-and-ass.component';
import { SelectBirthdateComponent } from './select-birthdate/select-birthdate.component';
import { SelectGenderComponent } from './select-gender/select-gender.component';
import { SignupCongratulationsComponent } from './signup-congratulations/signup-congratulations.component';
import { SignupWelcomeComponent } from './signup-welcome/signup-welcome.component';
import { UserRegistrationComponent } from './user-registration.component';

const routes: Routes = [
  {
    path: '',
    component: UserRegistrationComponent,
    children: [
      {
        path: 'signup',
        component: PhoneSignupComponent,
      },
      {
        path: 'verify',
        component: PhoneVerificationComponent,
      },
      {
        path: 'location-permission',
        component: LocationPermissionComponent,
      },
      {
        path: 'maps-location',
        component: MapsLocationComponent,
      },
      {
        path: 'welcome',
        component: SignupWelcomeComponent,
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
      },
      {
        path: 'my-birthday',
        component: SelectBirthdateComponent,
      },
      {
        path: 'my-interests',
        component: MyInterestsComponent,
      },
      {
        path: 'select-gender',
        component: SelectGenderComponent,
      },
      {
        path: 'interested-in',
        component: InterestedInComponent,
      },
      {
        path: 'my-photos',
        component: MyPhotosComponent,
      },
      {
        path: 'date-preferences',
        component: DatePreferencesComponent,
      },
      {
        path: 'goals-and-interests',
        component: GoalsAndInterestsComponent,
      },
      {
        path: 'age-and-height',
        component: AgeAndHeightComponent,
      },
      {
        path: 'face-and-ethnicity',
        component: FaceAndEthnicityComponent,
      },
      {
        path: 'rack-and-ass',
        component: RackAndAssComponent,
      },
      {
        path: 'implicit-swipes',
        component: ImplicitSwipesComponent,
      },
      {
        path: 'congratulations',
        component: SignupCongratulationsComponent,
      },
      {
        path: 'summary',
        component: SummarySectionComponent,
      },
      {
        path: 'preferences-vs-swipes',
        component: PreferencesVsSwipesComponent,
      },
      {
        path: 'account-take-over',
        loadChildren: () => import('./account-take-over/account-take-over.module').then((m) => m.AccountTakeOverPageModule),
      },
      { path: '**', redirectTo: 'signup' },
    ],
    canActivate: [UserRegistrationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRegistrationRoutingModule {}
