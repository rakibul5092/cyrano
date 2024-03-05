import { PortalModule } from '@angular/cdk/portal';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InputFieldModule, LibModalModule, SharedImageCropperModule } from 'nextsapien-component-lib';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SkeletonModule } from 'primeng/skeleton';
import { FormValidatorModule } from 'src/app/directives/form-validator/form-validator.module';
import { PasswordValidatorModule } from 'src/app/directives/password/password-validator.module';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { PipesModule } from '../../pipes/pipes.module';
import { MapModule } from '../shared/components/map/map.module';
import { PreferencesVsSwipesModule } from '../unmatched-account-setup/preferences-vs-swipes/preferences-vs-swipes.module';
import { SummarySectionComponent } from '../unmatched-account-setup/summary-section/summary-section.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AgeAndHeightComponent } from './age-and-height/age-and-height.component';
import { DatePreferencesComponent } from './date-preferences/date-preferences.component';
import { FaceAndEthnicityComponent } from './face-and-ethnicity/face-and-ethnicity.component';
import { GoalsAndInterestsComponent } from './goals-and-interests/goals-and-interests.component';
import { ImplicitSwipesModule } from './implicit-swipes/implicit-swipes.module';
import { InterestedInComponent } from './interested-in/interested-in.component';
import { HeaderModule } from './layout/header/header.module';
import { HeaderService } from './layout/header/header.service';
import { LocationPermissionComponent } from './location-permission/location-permission.component';
import { SnackbarComponentEnableLocation } from './location-permission/snack-bar-enable-location/snack-bar-enable-location.component';
import { MapsLocationComponent } from './maps-location/maps-location.component';
import { MyInterestsComponent } from './my-interests/my-interests.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhoneSignupFormModule } from './phone-signup/phone-signup-form/phone-signup-form.module';
import { PhoneSignupComponent } from './phone-signup/phone-signup.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { VerificationModule } from './phone-verification/verification/verification.module';
import { ProfileCompletedComponent } from './profile-completed/profile-completed.component';
import { RackAndAssComponent } from './rack-and-ass/rack-and-ass.component';
import { SelectBirthdateComponent } from './select-birthdate/select-birthdate.component';
import { SelectGenderComponent } from './select-gender/select-gender.component';
import { SignupCongratulationsComponent } from './signup-congratulations/signup-congratulations.component';
import { SignupWelcomeComponent } from './signup-welcome/signup-welcome.component';
import { WelcomeScreenModule } from './signup-welcome/welcome-screen/welcome-screen.module';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { UserRegistrationComponent } from './user-registration.component';
import { RangeMeterComponent } from './util-components/range-meter/range-meter.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    PhoneSignupComponent,
    PhoneVerificationComponent,
    SignupCongratulationsComponent,
    SignupWelcomeComponent,
    SelectBirthdateComponent,
    SelectGenderComponent,
    MyInterestsComponent,
    MyPhotosComponent,
    LocationPermissionComponent,
    MapsLocationComponent,
    ProfileCompletedComponent,
    AgeAndHeightComponent,
    FaceAndEthnicityComponent,
    RackAndAssComponent,
    RangeMeterComponent,
    PageNotFoundComponent,
    InterestedInComponent,
    AccountDetailsComponent,
    DatePreferencesComponent,
    GoalsAndInterestsComponent,
    SummarySectionComponent,
    SnackbarComponentEnableLocation,
  ],
  imports: [
    SubmitOnEnterModule,
    MatTooltipModule,
    PortalModule,
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    VerificationModule,
    ReactiveFormsModule,
    TranslateModule,
    UserRegistrationRoutingModule,
    ImplicitSwipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HeaderModule,
    PasswordValidatorModule,
    FormValidatorModule,
    MapModule,
    MatAutocompleteModule,
    PreferencesVsSwipesModule,
    PhoneSignupFormModule,
    WelcomeScreenModule,
    MatTooltipModule,
    SkeletonModule,
    InputFieldModule,
    MatSnackBarModule,
    LibModalModule,
    SharedImageCropperModule,
  ],
  exports: [HeaderModule],
  providers: [HeaderService, MatDatepickerModule, DatePipe, NgxImageCompressService],
})
export class UserRegistrationModule {}
