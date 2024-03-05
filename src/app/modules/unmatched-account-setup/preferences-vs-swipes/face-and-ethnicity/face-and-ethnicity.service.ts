import { Injectable } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { UnmatchedDatingPreferencesResponse } from 'src/app/modules/unmatched-account-setup/models/unmatched-dating-preferences.response.model';
import { PreferencesVsSwipesService } from '../preferences-vs-swipes.service';
@Injectable({
  providedIn: 'root',
})
export class FaceAndEthnicityService {
  public items: Array<PreferencesSwipesModules.FormResultItem>;

  constructor(private preferencesVsSwipesService: PreferencesVsSwipesService) {
    this.items = this.preferencesVsSwipesService.selectables.faceAndEthnicity;
  }

  public setData(response: UnmatchedDatingPreferencesResponse): void {
    for (let i = 0; i < this.items.length; i++) {
      const e = this.items[i];
      if (e.title === PreferencesSwipesModules.Modules.ImplicitFormResult.title) {
        if (response?.implicit?.face) {
          e.value1 = String(response.implicit.face);
        } else {
          e.value1 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
        if (response?.implicit?.ethnicity) {
          if (response.implicit.ethnicity.length > 0) {
            e.value2 = response.implicit.ethnicity.toString().replace(/,/g, ', ');
          } else {
            e.value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
          }
        } else {
          e.value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      } else if (e.title === PreferencesSwipesModules.Modules.ExplicitFormResult.title) {
        if (response?.explicit?.face) {
          e.value1 = String(response.explicit.face);
        } else {
          e.value1 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
        if (response?.explicit?.ethnicity?.length > 0) {
          e.value2 = response.explicit.ethnicity.toString().replace(/,/g, ', ');
        } else {
          e.value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      } else if (e.title === PreferencesSwipesModules.Modules.CombinedFormResult.title) {
        const implicit = response.implicit;
        const explicit = response.explicit;
        if (implicit.face && implicit.ethnicity && explicit.face && explicit.ethnicity) {
          if (response.combined.face) e.value1 = response.combined.face.toString();
          if (response.combined.ethnicity) e.value2 = response.combined.ethnicity.toString();
        } else {
          e.value1 =
            (implicit?.face !== 0 ? implicit?.face?.toString() : null) ||
            (explicit?.face !== 0 ? explicit?.face?.toString() : null) ||
            PreferencesSwipesModules.Modules.Constants.NotSet;
          e.value2 =
            implicit?.ethnicity?.toString().replace(/,/g, ', ') || explicit?.ethnicity?.toString().replace(/,/g, ', ') || PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      }
    }
  }
}
