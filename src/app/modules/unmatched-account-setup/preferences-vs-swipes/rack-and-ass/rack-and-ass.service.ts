import { Injectable } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { UnmatchedDatingPreferencesResponse } from 'src/app/modules/unmatched-account-setup/models/unmatched-dating-preferences.response.model';
import { PreferencesVsSwipesService } from '../preferences-vs-swipes.service';

@Injectable({
  providedIn: 'root',
})
export class RackAndAssService {
  public items: Array<PreferencesSwipesModules.FormResultItem>;

  constructor(private preferencesVsSwipesService: PreferencesVsSwipesService) {
    this.items = this.preferencesVsSwipesService.selectables.rackAndAss;
  }

  public setData(response: UnmatchedDatingPreferencesResponse): void {
    for (let i = 0; i < this.items.length; i++) {
      const e = this.items[i];

      if (e.title === PreferencesSwipesModules.Modules.ImplicitFormResult.title) {
        if (response.implicit?.rack?.length > 0) {
          e.value1 = response.implicit.rack.join(', ');
        } else {
          e.value1 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
        if (response.implicit?.ass?.length > 0) {
          e.value2 = response.implicit.ass.join(', ');
        } else {
          e.value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      } else if (e.title === PreferencesSwipesModules.Modules.ExplicitFormResult.title) {
        if (response.explicit?.rack?.length > 0) {
          e.value1 = response.explicit.rack.join(', ');
        } else {
          e.value1 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
        if (response.explicit?.ass?.length > 0) {
          e.value2 = response.explicit.ass.join(', ');
        } else {
          e.value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      } else if (e.title === PreferencesSwipesModules.Modules.CombinedFormResult.title) {
        const implicit = response.implicit;
        const explicit = response.explicit;
        if (implicit.rack && implicit.ass && explicit.rack && explicit.ass) {
          if (response.combined.rack) e.value1 = response.combined.rack.join(', ');
          if (response.combined.ass) e.value2 = response.combined.ass.join(', ');
        } else {
          e.value1 = implicit?.rack?.join(', ') || explicit?.rack?.join(', ') || PreferencesSwipesModules.Modules.Constants.NotSet;
          e.value2 = implicit?.ass?.join(', ') || explicit?.ass?.join(', ') || PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      }
    }
  }
}
