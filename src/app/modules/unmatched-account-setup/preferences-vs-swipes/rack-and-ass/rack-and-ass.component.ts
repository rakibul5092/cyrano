import { Component, Input, OnInit } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { UnmatchedDatingPreferencesResponse } from 'src/app/modules/unmatched-account-setup/models/unmatched-dating-preferences.response.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { PreferencesVsSwipesService } from '../preferences-vs-swipes.service';
import { RackAndAssService } from './rack-and-ass.service';

@Component({
  selector: 'app-rack-and-ass',
  templateUrl: './rack-and-ass.component.html',
  styleUrls: ['./rack-and-ass.component.scss'],
})
export class RackAndAssComponent implements OnInit {
  @Input() payload: any;
  /**
   * @param commonService
   */
  constructor(public commonService: CommonUtilService, public dataService: RackAndAssService, private prefswipeservice: PreferencesVsSwipesService) {}

  /***/
  ngOnInit(): void {
    this.prefswipeservice.changeCurrentModule(PreferencesSwipesModules.RackAndAss.name);
  }

  public updateRackAss(res: UnmatchedDatingPreferencesResponse): void {
    this.dataService.setData(res);
  }
  /**
   * @param index
   */
  public onSelect(index: number): void {
    this.prefswipeservice.changeSelectedItem(index);
  }
}
