import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { CommonUtilService } from '../../../services/common-utils.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class PrivacyPolicyComponent {
  constructor(private headerService: HeaderService, public readonly commonUtilService: CommonUtilService) {
    this.headerService.showHeader$.next(true);
  }
}
