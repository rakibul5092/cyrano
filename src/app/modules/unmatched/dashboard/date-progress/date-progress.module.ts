import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/modules/shared/components/shared-components.module';
import { DateProgressComponent } from './date-progress.component';

@NgModule({
  declarations: [DateProgressComponent],
  imports: [CommonModule, SharedComponentsModule],
  exports: [DateProgressComponent],
})
export class DateProgressModule {}
