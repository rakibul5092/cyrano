import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';

class SelectableItem {
  public selectableItem: Array<PreferencesSwipesModules.FormResultItem> = [
    {
      title: PreferencesSwipesModules.Modules.ImplicitFormResult.title,
      value1: PreferencesSwipesModules.Modules.Constants.NotSet,
      value2: PreferencesSwipesModules.Modules.Constants.NotSet,
      selected: false,
    },
    {
      title: PreferencesSwipesModules.Modules.ExplicitFormResult.title,
      value1: PreferencesSwipesModules.Modules.Constants.NotSet,
      value2: PreferencesSwipesModules.Modules.Constants.NotSet,
      selected: false,
    },
    {
      title: PreferencesSwipesModules.Modules.CombinedFormResult.title,
      value1: PreferencesSwipesModules.Modules.Constants.NotSet,
      value2: PreferencesSwipesModules.Modules.Constants.NotSet,
      selected: false,
    },
  ];
}

export default SelectableItem;
