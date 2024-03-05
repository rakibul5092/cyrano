import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsnValidatorDirective } from './ssn-validator.directive';

@NgModule({
  declarations: [SsnValidatorDirective],
  imports: [CommonModule],
  exports: [SsnValidatorDirective],
})
export class SsnValidatorModule {}
