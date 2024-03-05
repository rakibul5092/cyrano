import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FocusInvalidInputDirective } from './focus-invalid/focus-invalid-input.directive';
import { InvalidInputDirective } from './invalid-input/invalid-input.directive';

@NgModule({
  declarations: [FocusInvalidInputDirective, InvalidInputDirective, ErrorMessageComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [FocusInvalidInputDirective, InvalidInputDirective, ErrorMessageComponent],
})
export class FormValidatorModule {}
