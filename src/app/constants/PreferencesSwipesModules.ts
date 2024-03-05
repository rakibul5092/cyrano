enum ImplicitFormResult {
  title = 'Implicit swipe results',
}

enum ExplicitFormResult {
  title = 'Explicit swipe results',
}

enum CombinedFormResult {
  title = 'Combined results',
}

enum Constants {
  NotSet = 'Not Set',
}

interface FormResultItem {
  title: string;
  value1: string | number | Number;
  value2: string | number | Number;
  selected: boolean;
}
interface EthnicitieRackAssType {
  name: string;
  selected: boolean;
}

const Modules = {
  ImplicitFormResult,
  ExplicitFormResult,
  CombinedFormResult,
  Constants,
};

const AgeAndHeight = {
  ageRange: { min: 18, max: 100 },
  defaultAgeRange: { min: 19, max: 45 },
  heightRange: { min: 4.0, max: 7.0 },
  defaultHeightRange: { min: 5.0, max: 6.0 },
  name: 'age-height',
  modalTitle: 'Edit Explicit values for Age & Height',
};

const FaceAndEthnicity = {
  name: 'face-ethnicity',
  modalTitle: 'Edit Explicit values for Face & Ethnicity',
};

const RackAndAss = {
  name: 'rack-ass',
  modalTitle: 'Edit Explicit values for Rack & Ass',
};

enum PreferredType {
  IMPLICIT = 'implicit',
  EXPLICIT = 'explicit',
  COMBINED = 'combined',
}

enum PreferredTypeIndex {
  IMPLICIT = 0,
  EXPLICIT = 1,
  COMBINED = 2,
}

const SelectableItem = [PreferredType.IMPLICIT, PreferredType.EXPLICIT, PreferredType.COMBINED];
export { Modules, FormResultItem, AgeAndHeight, FaceAndEthnicity, RackAndAss, PreferredType, PreferredTypeIndex, SelectableItem, EthnicitieRackAssType };
