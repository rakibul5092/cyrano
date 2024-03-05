import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubmitOnEnterDirective } from './submit-on-enter.directive';

@NgModule({
  declarations: [SubmitOnEnterDirective],
  imports: [CommonModule],
  exports: [SubmitOnEnterDirective],
})
export class SubmitOnEnterModule {}
