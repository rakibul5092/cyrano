import { DatingAccountModel } from './dating-account.model';

export interface ClientModel {
  id: string;
  name: string;
  profileImage: string;
  country: string;
  rate: number;
  datingDate?: Date;
  remainingDates?: number;
  dates?: number;
  accounts?: DatingAccountModel[];
  accountsType?: string;
}
