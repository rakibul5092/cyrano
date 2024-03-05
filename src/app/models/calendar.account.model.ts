import { CalendarAccountEnum } from '../enums/calendar.account.enum';
import { BaseModel } from '../modules/base/base.model';

export interface CalendarAccountModel extends BaseModel {
  title?: string;
  userId?: string;
  type?: CalendarAccountEnum;
  email?: string;
  active?: boolean;
  token?: string;
  selected?: boolean;
  theme?: CalendarAccountThemeModel;
}

export interface CalendarAccountThemeModel {
  backgroundColor?: string;
  foregroundColor?: string;
  borderColor?: string;
}

export const DEFAULT_ACCOUNT_THEME: CalendarAccountThemeModel = {
  backgroundColor: '#59A7D7',
  foregroundColor: '#ffffff',
  borderColor: '#56BFFF',
};
