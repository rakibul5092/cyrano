import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClockHour } from './clock-hour.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [FilterPipe, ClockHour],
  imports: [CommonModule],
  exports: [FilterPipe, ClockHour],
})
export class PipeModule {}
