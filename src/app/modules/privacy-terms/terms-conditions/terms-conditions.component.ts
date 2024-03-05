import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { CommonUtilService } from '../../../services/common-utils.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TermsConditionsComponent {
  constructor(private headerService: HeaderService, public readonly commonUtilService: CommonUtilService) {
    this.headerService.showHeader$.next(true);
  }
}
