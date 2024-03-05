import { CalendarAccountEnum } from '../enums/calendar.account.enum';

export interface CalendarAccountType {
  icon: string;
  add: string;
  type: CalendarAccountEnum;
}

export const accountTypesItems: CalendarAccountType[] = [
  {
    icon: 'googleCalender',
    add: 'ACCOUNT_SETUP.ADD_GOOGLE_ACCOUNT',
    type: CalendarAccountEnum.GOOGLE,
  },
  {
    icon: 'microsoft',
    add: 'ACCOUNT_SETUP.ADD_MICROSOFT_ACCOUNT',
    type: CalendarAccountEnum.MICROSOFT,
  },
];
