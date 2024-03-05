import { Component, OnInit } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { UnmatchedDatingPreferencesResponse } from 'src/app/modules/unmatched-account-setup/models/unmatched-dating-preferences.response.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { PreferencesVsSwipesService } from '../preferences-vs-swipes.service';
import { FaceAndEthnicityService } from './face-and-ethnicity.service';
@Component({
  selector: 'app-face-and-ethnicity',
  templateUrl: './face-and-ethnicity.component.html',
  styleUrls: ['./face-and-ethnicity.component.scss'],
})
export class FaceAndEthnicityComponent implements OnInit {
  /**
   * @param commonService
   */
  constructor(public commonService: CommonUtilService, public dataService: FaceAndEthnicityService, private prefswipeservice: PreferencesVsSwipesService) {}

  /***/
  ngOnInit(): void {
    this.prefswipeservice.changeCurrentModule(PreferencesSwipesModules.FaceAndEthnicity.name);
  }

  public updateFaceEthnicity(res: UnmatchedDatingPreferencesResponse): void {
    this.dataService.setData(res);
  }

  /**
   * @param index
   */
  public onSelect(index: number): void {
    this.prefswipeservice.changeSelectedItem(index);
  }
}
