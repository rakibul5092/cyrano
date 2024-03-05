import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingDatesComponent } from './upcoming-dates.component';
import { UpcomingDateCardModule } from '../upcoming-date-card/upcoming-date-card.module';
import { NoDateRunCardComponent } from '../no-date-run-card/no-date-run-card.component';

@NgModule({
  declarations: [UpcomingDatesComponent, NoDateRunCardComponent],
  imports: [CommonModule, UpcomingDateCardModule],
  exports: [UpcomingDatesComponent],
})
export class UpcomingDatesModule {}
