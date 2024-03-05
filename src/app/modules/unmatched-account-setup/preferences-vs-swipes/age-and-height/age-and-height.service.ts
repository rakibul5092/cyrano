import { Injectable } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { UnmatchedDatingPreferencesResponse } from 'src/app/modules/unmatched-account-setup/models/unmatched-dating-preferences.response.model';
import { UserRegistrationService } from 'src/app/modules/user-registration/services/user-registration.service';
import { PreferencesVsSwipesService } from '../preferences-vs-swipes.service';

@Injectable({
  providedIn: 'root',
})
export class AgeAndHeightService {
  public items: Array<PreferencesSwipesModules.FormResultItem>;
  constructor(public userigistration: UserRegistrationService, private preferencesVsSwipesService: PreferencesVsSwipesService) {
    this.items = this.preferencesVsSwipesService.selectables.ageAndHeight;
  }

  public setData(response: UnmatchedDatingPreferencesResponse): void {
    type MaxMin = { min: Number; max: Number };
    type AgeHeightType = { age: MaxMin; height: MaxMin };

    const items = this.items;
    const implicit: AgeHeightType = {
      age: response.implicit.age,
      height: response.implicit.height,
    };
    const explicit: AgeHeightType = {
      age: response.explicit.age,
      height: response.explicit.height,
    };

    for (let i = 0; i < items.length; i++) {
      if (items[i].title === PreferencesSwipesModules.Modules.ImplicitFormResult.title) {
        if (implicit.age.min && implicit.age.max) {
          items[i].value1 = `${parseInt(implicit.age.min.toString())} - ${parseInt(implicit.age.max.toString())}`;
        } else {
          items[i].value1 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }

        if (implicit.height.min && implicit.height.max) {
          items[i].value2 = `${this.convertValToFt(implicit.height.min.valueOf())} - ${this.convertValToFt(implicit.height.max.valueOf())}`;
        } else {
          items[i].value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
        }
      } else if (items[i].title === PreferencesSwipesModules.Modules.CombinedFormResult.title) {
        const combined = {
          age: {
            min: response.combined.age.min ? Math.round(response.combined.age.min.valueOf()) : null,
            max: response.combined.age.max ? Math.round(response.combined.age.max.valueOf()) : null,
          },
          height: {
            min: response.combined.height.min?.toFixed(2) || null,
            max: response.combined.height.max?.toFixed(2) || null,
          },
        };
        if (combined.age.min && combined.age.max) items[i].value1 = `${combined.age.min} - ${combined.age.max}`;
        else items[i].value1 = PreferencesSwipesModules.Modules.Constants.NotSet;
        if (combined.height.min && combined.height.max) items[i].value2 = `${this.convertValToFt(combined.height.min)} - ${this.convertValToFt(combined.height.max)}`;
        else items[i].value2 = PreferencesSwipesModules.Modules.Constants.NotSet;
      } else if (items[i].title === PreferencesSwipesModules.Modules.ExplicitFormResult.title) {
        if (explicit.age.min && explicit.age.max) {
          items[i].value1 = `${explicit.age.min} - ${explicit.age.max}`;
        }
        if (explicit.height.min && explicit.height.max) {
          items[i].value2 = `${this.convertValToFt(explicit.height.min.valueOf())} - ${this.convertValToFt(explicit.height.max.valueOf())}`;
        }
      }
    }
  }

  /**
   *
   * @param { number | string } val - Takes the preferred height as a number
   * @returns The height into foot and inches format
   */
  private convertValToFt(val: number | string): string {
    const int = parseInt(val.toString());
    const dec = parseInt((parseFloat(val.toString()) * 10).toString()) % 10;
    return `${int}’ ${dec}” ft`;
  }
}
