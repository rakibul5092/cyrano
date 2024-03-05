import { Component } from '@angular/core';
import { CommonUtilService } from '../../../services/common-utils.service';

@Component({
  selector: 'app-unmatched-account-log',
  templateUrl: './unmatched-account-log.component.html',
  styleUrls: ['./unmatched-account-log.component.scss'],
})
export class UnmatchedAccountLogComponent {
  /***/
  constructor(public commonUtilService: CommonUtilService) {}

  /**
   * TODO: IMPLEMENT
   * TODO: ADD JS_DOC LATER WHEN IMPLEMENTED
   */
  removeTag(): void {
    throw new Error('Not implemented yet!');
  }
}
