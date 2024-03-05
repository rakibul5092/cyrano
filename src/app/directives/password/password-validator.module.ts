import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmPasswordValidatorDirective } from './confirm-password-validator.directive';
import { CustomPasswordValidatorDirective } from './custom-password-validator.directive';
import { PasswordValidatorDirective } from './password-validator.directive';

@NgModule({
  declarations: [PasswordValidatorDirective, ConfirmPasswordValidatorDirective, CustomPasswordValidatorDirective],
  imports: [CommonModule],
  exports: [PasswordValidatorDirective, ConfirmPasswordValidatorDirective, CustomPasswordValidatorDirective],
})
export class PasswordValidatorModule {}
