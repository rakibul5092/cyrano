import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTelInputDirective } from './ngx-tel-input.directive';

@NgModule({
  declarations: [NgxTelInputDirective],
  imports: [CommonModule],
  exports: [NgxTelInputDirective],
})
export class NgxTelInputModule {}
