import { PreferredType } from '../../../constants/PreferencesSwipesModules';

export interface UnmatchedDatingPreferencesResponse {
  implicit: {
    age: { min: Number; max: Number };
    height: { min: Number; max: Number };
    face: Number;
    ethnicity: string[];
    rack: string[];
    ass: string[];
  };
  explicit: {
    age: { min: Number; max: Number };
    height: { min: Number; max: Number };
    face: Number;
    ethnicity: string[];
    rack: string[];
    ass: string[];
  };
  combined: {
    age: { min: Number; max: Number };
    height: { min: Number; max: Number };
    face: Number;
    ethnicity: string[];
    rack: string[];
    ass: string[];
  };
  preferredType: PreferredType.IMPLICIT | PreferredType.EXPLICIT | PreferredType.COMBINED | null;
}
