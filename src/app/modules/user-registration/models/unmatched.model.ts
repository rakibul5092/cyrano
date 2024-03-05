import { PreferredType } from 'src/app/constants/PreferencesSwipesModules';
import { Card } from 'src/app/models/card.model';
import { BaseModel } from '../../base/base.model';
import { DatingPlatform } from './dating-platforms';
import { Image } from './image.model';
import { PersonalInterest } from './personal-interest.model';

export type Gender = 'man' | 'woman' | 'other' | 'any';

export interface Unmatched extends BaseModel {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  location?: {
    lat: number;
    long: number;
  };
  preferredLocations?: {
    radius: number;
    lat: number;
    long: number;
  }[];
  address?: {
    addressLine1: string;
    addressLine2: string;
  };
  profession?: string;
  about?: string;
  birthDate?: string;
  gender?: Gender;
  interestedIn?: Gender;
  verified?: boolean;
  acceptedConditions?: boolean;
  initiatedSummarySection?: boolean;
  initiatedCalendarSetup?: boolean;
  initiatedSendRequestFlow?: boolean;
  rewardedInAppCurrency?: boolean;
  personalInterests?: PersonalInterest[];
  datingPlatforms?: DatingPlatform[];
  selectedPlatforms?: {
    datingPlatform: DatingPlatform;
    accountAlreadyExists: boolean;
  }[];
  datingPlatformsInfo?: {
    accountAlreadyExists: boolean;
    password: string;
  }[];
  datingAccountPhoneNumberDetails?: {
    usingExistingPhoneNumber?: boolean;
    noOtherAccountExists?: boolean;
    phoneNumber?: string;
    pricePlan?: number;
  };
  cardDetails?: Card;
  images?: Image[];
  percentage?: number;
  otp?: {
    code?: string;
    retries?: string;
  };
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
    preferredType?: PreferredType.IMPLICIT | PreferredType.EXPLICIT | PreferredType.COMBINED;
    friends: boolean;
    relationships: boolean;
    interests?: number;
  };
  likes?: string[];
  disLikes?: string[];
  numberOfProfilesSwiped?: number;
  lastActiveRoute?: string;
}
