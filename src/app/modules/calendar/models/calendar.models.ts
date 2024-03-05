import { CalendarAccountEnum } from '../../../enums/calendar.account.enum';

export interface EventModel {
  _id: string;
  title: string;
  allDay?: boolean;
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime?: string;
  note?: string;
  type?: CalendarAccountEnum;
  email?: string;
  accountId?: string;
  timeZone?: string;
}

export interface DaysFilterModel {
  name: string;
  value: number;
}

export interface WeekDayModel {
  day: string;
  dayDate: Date;
}
