import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isThisWeek } from 'date-fns';

export const dateInCurrentWeek =
  (): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const date = new Date(control.value);

    return isThisWeek(date) ? null : { message: 'VALIDATIONS.DATE_MUST_FALL_INTO_CURRENT_WEEK' };
  };
