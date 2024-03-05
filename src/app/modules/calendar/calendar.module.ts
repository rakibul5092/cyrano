import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PipeModule } from 'src/app/pipes/pipe.module';

import { DashedCheckboxModule } from 'nextsapien-component-lib';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { FormValidatorModule } from '../../directives/form-validator/form-validator.module';
import { CardsModule } from '../shared/components/cards/cards.module';
import { DateTimeModule } from '../shared/components/date-time/date-time.module';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { UserRegistrationModule } from '../user-registration/user-registration.module';
import { AccountSetupPage } from './account-setup/account-setup.page';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CompletePage } from './complete/complete.page';
import { AccountThemeComponent } from './components/account-theme/account-theme.component';
import { AddItineraryComponent } from './components/add-itinerary/add-itinerary.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { ManageCalendarComponent } from './components/manage-calendar/manage-calendar.component';
import { FreeSlotsPage } from './free-slots/free-slots.page';
import { MyCalendarAccountsPage } from './my-calendar-accounts/my-calendar-accounts.page';

@NgModule({
  declarations: [
    CalendarComponent,
    ManageCalendarComponent,
    EventFormComponent,
    CalendarHeaderComponent,
    EventInfoComponent,
    FreeSlotsPage,
    CompletePage,
    AddItineraryComponent,
    AddLocationComponent,
    AccountThemeComponent,
    AccountSetupPage,
    MyCalendarAccountsPage,
  ],
  imports: [
    SubmitOnEnterModule,
    CommonModule,
    CalendarRoutingModule,
    MatButtonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    FormValidatorModule,
    MatIconModule,
    MatMenuModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DateTimeModule,
    CardsModule,
    PipeModule,
    UserRegistrationModule,
    SharedComponentsModule,
    DashedCheckboxModule,
  ],
})
export class CalendarModule {}
