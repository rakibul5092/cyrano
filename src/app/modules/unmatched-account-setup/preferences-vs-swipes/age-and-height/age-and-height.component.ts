import { Component, OnInit } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { PreferencesVsSwipesService } from '../preferences-vs-swipes.service';
import { AgeAndHeightService } from './age-and-height.service';

@Component({
  selector: 'app-age-and-height',
  templateUrl: './age-and-height.component.html',
  styleUrls: ['./age-and-height.component.scss'],
})
export class AgeAndHeightComponent implements OnInit {
  /**
   * @param commonService
   */
  constructor(public commonService: CommonUtilService, public dataService: AgeAndHeightService, private prefswipeservice: PreferencesVsSwipesService) {}

  /***/
  ngOnInit(): void {
    this.prefswipeservice.changeCurrentModule(PreferencesSwipesModules.AgeAndHeight.name);
  }

  /**
   * @param index
   */
  public onSelect(index: number): void {
    this.prefswipeservice.changeSelectedItem(index);
  }
}
