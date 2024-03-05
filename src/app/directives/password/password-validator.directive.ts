import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  @Input() public passwordErrorMsg: string = 'Please provide a valid Password';
  // Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%)(*#^?&])[A-Za-z\d@$!%)(*#^?&]{6,}$/;

  /**
   * validate function
   *
   * @param control
   */
  validate(control: FormControl): ValidationErrors | null {
    if (!control) {
      return null;
    }
    return this.passwordRegex.test(control.value) ? null : this.message();
  }

  /**
   * build the error msg
   *
   * @private
   */
  private message(): any {
    return {
      password: {
        message: this.passwordErrorMsg,
        order: 1,
      },
    };
  }
}
