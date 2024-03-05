import { BaseModel } from '../../base/base.model';
import { PersonalInterest } from './personal-interest.model';

export type Gender = 'man' | 'woman' | 'other' | 'any';

export interface DummyProfile extends BaseModel {
  _id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  distance?: string;
  profession?: string;
  about?: string;
  birthDate?: string;
  gender?: Gender;
  interestedIn?: Gender;
  personalInterests?: PersonalInterest[];
  interests?: string[];
  images?: string[];
  datingPreferences?: {
    rack?: string[];
    ass?: string[];
    face?: number;
    ethnicity?: string[];
    age?: {
      min?: string;
      max?: string;
    };
    height?: {
      min?: string;
      max?: string;
    };
    friends: boolean;
    relationships: boolean;
    interests?: number;
  };
  matchingPercentage?: number;
  age?: number;
  index?: number;
}
