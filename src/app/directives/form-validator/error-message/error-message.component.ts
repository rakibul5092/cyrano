import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl;
  @Input() minLength: number;
  @Input() maxlength: number;
  @Input() customErrorMessage: string;
  @Input() freeContent: boolean;
  constructor(public commonUtilService: CommonUtilService) {}

  /**
   * check if control has error
   *
   * @param errorName
   */
  public onError(errorName): boolean {
    return this.control.touched && this.control.errors && this.control.errors[errorName];
  }
}
