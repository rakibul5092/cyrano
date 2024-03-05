export interface DatingPreferences {
  Face: {
    Any: 'Any';
    Least: 'Least';
    Moderate: 'Moderate';
    TheMost: 'The most';
  };
  Ethnicity: {
    Asian: 'Asian';
    African: 'African';
    White: 'White';
    Latino: 'Latino';
    Black: 'Black';
  };
  Rack: {
    Any: 'Any';
    Less: 'Less';
    Handful: 'Handful';
    More: 'More';
  };
  Ass: {
    Any: 'Any';
    Less: 'Less';
    Handful: 'Handful';
    More: 'More';
  };
}

export type DatingPreferencesFaces =
  | DatingPreferences['Face']['Any']
  | DatingPreferences['Face']['Least']
  | DatingPreferences['Face']['Moderate']
  | DatingPreferences['Face']['TheMost'];

export type DatingPreferencesEthnicities =
  | DatingPreferences['Ethnicity']['Asian']
  | DatingPreferences['Ethnicity']['African']
  | DatingPreferences['Ethnicity']['White']
  | DatingPreferences['Ethnicity']['Latino']
  | DatingPreferences['Ethnicity']['Black'];

export type DatingPreferencesRacks =
  | DatingPreferences['Rack']['Any']
  | DatingPreferences['Rack']['Less']
  | DatingPreferences['Rack']['Handful']
  | DatingPreferences['Rack']['More'];

export type DatingPreferencesAsses = DatingPreferences['Ass']['Any'] | DatingPreferences['Ass']['Less'] | DatingPreferences['Ass']['Handful'] | DatingPreferences['Ass']['More'];
