import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSetupPage } from './account-setup/account-setup.page';
import { CalendarComponent } from './calendar.component';
import { CompletePage } from './complete/complete.page';
import { FreeSlotsPage } from './free-slots/free-slots.page';
import { MyCalendarAccountsPage } from './my-calendar-accounts/my-calendar-accounts.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CalendarComponent,
  },
  {
    path: 'setup',
    component: AccountSetupPage,
  },
  {
    path: 'free-slots',
    component: FreeSlotsPage,
  },
  {
    path: 'complete',
    component: CompletePage,
  },
  {
    path: 'accounts',
    component: MyCalendarAccountsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
