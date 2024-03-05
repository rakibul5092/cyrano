import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appConfirmPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class ConfirmPasswordValidatorDirective implements Validator {
  @Input() appConfirmPasswordValidator: string;

  /**
   * validate function
   *
   * @param control
   */
  validate(control: FormControl): ValidationErrors | null {
    if (!control || !control.value) {
      return null;
    }
    const password = control.root.get(this.appConfirmPasswordValidator);
    if (password) {
      const subscription: Subscription = password.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return password.value !== control.value ? { confirmPasswordError: true } : null;
  }
}
