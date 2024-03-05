export const datePickerSheetModalConfig = {
  cssClass: 'date-picker-sheet-modal',
};

export enum dateTimePresentation {
  time = 'time',
  date = 'date',
  dateTime = 'date-time',
}

export const presentationFormat: Map<dateTimePresentation, string> = new Map([
  [dateTimePresentation.time, 'HH:mm'],
  [dateTimePresentation.dateTime, 'yyyy-MM-ddHH:mm'],
  [dateTimePresentation.date, 'yyyy-MM-dd'],
]);

export interface SelectedDateModel {
  value?: Date;
  formattedValue?: string;
  cancel?: boolean;
  clear?: boolean;
}
