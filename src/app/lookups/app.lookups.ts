export enum AlertTypes {
  success = 'success',
  error = 'danger',
  warning = 'warning',
}
export enum StatusCodes {
  forbidden = 403,
  badRequest = 400,
  notValidPassword = 4000,
  oldPassword = 4001,
}
export const datePickerSheetModalConfig = {
  cssClass: 'date-picker-sheet-modal',
};
export const sheetModalConfig = { cssClass: 'custom-sheet-modal', breakpoints: [0, 0.25, 0.5, 1] };
export const modalConfig = { cssClass: 'custom-modal' };
export const SSN_MASK: string = '000-00-0000';

export const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday'];
