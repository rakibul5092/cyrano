export class Event {
  _id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  dayOfWeek: number; //   specifies the day of the week from 0-10 i.e sunday to monday
  meridian: 'am' | 'pm' | 'AM' | 'PM';
}
