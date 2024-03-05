import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateAccountComponent } from './date-account/date-account.component';
import { PotentialDatesHomeComponent } from './potential-dates-home/potential-dates-home.component';
import { PotentialDatesLocationsComponent } from './potential-dates-locations/potential-dates-locations.component';
import { PotentialDatesSelectGuruComponent } from './potential-dates-select-guru/potential-dates-select-guru.component';
import { PotentialDatesSuccessComponent } from './potential-dates-success/potential-dates-success.component';
import { PotentialDatesComponent } from './potential-dates.component';

const routes: Routes = [
  {
    path: '',
    component: PotentialDatesComponent,
    children: [
      {
        path: '',
        component: PotentialDatesHomeComponent,
      },
      {
        path: 'date/:id',
        component: DateAccountComponent,
      },
      {
        path: 'confirm-date',
        component: PotentialDatesSelectGuruComponent,
      },
      {
        path: 'locations',
        component: PotentialDatesLocationsComponent,
      },
      {
        path: 'success',
        component: PotentialDatesSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotentialDatesRoutesModule {}
