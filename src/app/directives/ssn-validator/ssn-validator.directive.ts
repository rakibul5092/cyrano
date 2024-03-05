import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appSsnValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SsnValidatorDirective,
      multi: true,
    },
  ],
})
export class SsnValidatorDirective implements Validator {
  @Input() public ssnErrorMsg: string = 'Please provide a valid SSN';
  private ssnRegex = /^(?!(000|666|9))(\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4})$/;

  /**
   * validate function
   *
   * @param control
   */
  validate(control: FormControl): ValidationErrors | null {
    if (!control) {
      return null;
    }
    return this.ssnRegex.test(control.value) ? null : this.message();
  }

  /**
   * build the error msg
   *
   * @private
   */
  private message(): any {
    return {
      ssn: {
        message: this.ssnErrorMsg,
        order: 1,
      },
    };
  }
}
