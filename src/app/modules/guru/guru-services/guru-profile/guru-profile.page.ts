import { Component } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { GuruProfileService } from './guru-profile.service';

@Component({
  selector: 'app-guru-profile',
  templateUrl: './guru-profile.page.html',
  styleUrls: ['./guru-profile.page.scss'],
})
export class GuruProfilePage {
  public icons = this.commonUtil.icons;
  public profile = this.guruProfileService.profile;

  constructor(private commonUtil: CommonUtilService, private guruProfileService: GuruProfileService) {}
}
