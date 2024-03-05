import { CalendarEventAction } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { DaysFilterModel } from '../models/calendar.models';

export const CALENDAR_COLORS: Record<string, EventColor> = {
  primary: {
    primary: '#59A7D7',
    secondary: 'rgba(20, 115, 172, 0.2)',
    secondaryText: '#56BFFF',
  },
  allDay: {
    primary: '#fe3c72',
    secondary: 'rgb(254,60,114, 0.2)',
    secondaryText: '#fff',
  },
};

export const CALENDAR_EDIT_EVENT: CalendarEventAction = {
  label: '',
  a11yLabel: 'Edit',
  onClick: () => {},
};

export const CALENDAR_DELETE_EVENT: CalendarEventAction = {
  label: '',
  a11yLabel: 'Delete',
  onClick: () => {},
};

export const CALENDAR_FILTERS: DaysFilterModel[] = [
  { name: 'CALENDAR.DAYS_FILTER.DAY', value: 1 },
  { name: 'CALENDAR.DAYS_FILTER.WEEK', value: 7 },
  { name: 'CALENDAR.DAYS_FILTER.DAYS', value: 4 },
];
