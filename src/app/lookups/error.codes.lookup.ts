import { HttpStatusCode } from '@angular/common/http';

export interface ExceptionType {
  httpStatus: HttpStatusCode;
  statusCode?: number;
  message?: string;
  title?: string;
  fieldName?: string;
}

export const APPLICATION_ERRORS: { [key: string]: ExceptionType } = {
  SERVER_ERROR: {
    httpStatus: HttpStatusCode.InternalServerError,
    statusCode: HttpStatusCode.InternalServerError,
    message: 'ERRORS.SERVER_ERROR',
    title: 'ERRORS.SERVER_ERROR_TITLE',
  },
  BAD_REQUEST: { httpStatus: HttpStatusCode.InternalServerError, statusCode: 4000, message: 'ERRORS.SERVER_ERROR', title: 'ERRORS.SERVER_ERROR_TITLE' },
  UNAUTHORIZED_ERROR: { httpStatus: HttpStatusCode.Unauthorized, message: 'ERRORS.UNAUTHORIZED_ERROR', title: 'ERRORS.UNAUTHORIZED_ERROR_TITLE' },
  TIME_OUT_ERROR: { httpStatus: HttpStatusCode.RequestTimeout, message: 'ERRORS.TIME_OUT_ERROR', title: 'ERRORS.TIME_OUT_ERROR_TITLE' },
  NOT_FOUND: { httpStatus: HttpStatusCode.NotFound, message: 'ERRORS.NOT_FOUND_ERROR', title: 'ERRORS.NOT_FOUND_ERROR_TITLE' },
  LOGIN_NOT_VALID: { httpStatus: HttpStatusCode.NotFound, statusCode: HttpStatusCode.NotFound, message: 'AUTH.LOGIN_NOT_VALID', title: 'AUTH.LOGIN' },
  NOT_VALID_PASSWORD: { httpStatus: HttpStatusCode.BadRequest, statusCode: 4000, message: 'AUTH.NOT_VALID_PASSWORD', title: 'AUTH.RESET_PASSWORD' },
  REGISTER_NOT_VALID_PASSWORD: { httpStatus: HttpStatusCode.BadRequest, statusCode: 4000, message: 'AUTH.NOT_VALID_PASSWORD', title: 'AUTH.CREATE_ACCOUNT' },
  OLD_PASSWORD: { httpStatus: HttpStatusCode.BadRequest, statusCode: 4001, message: 'AUTH.OLD_PASSWORD', title: 'AUTH.RESET_PASSWORD' },
  INVALID_CODE: { httpStatus: HttpStatusCode.BadRequest, statusCode: HttpStatusCode.BadRequest, message: 'AUTH.VERIFY_EMAIL_INVALID_CODE', title: 'AUTH.VERIFY_EMAIL' },
  VERIFY_EMAIL_RESEND_MAX_RETRIES_ERROR: {
    httpStatus: HttpStatusCode.Forbidden,
    statusCode: HttpStatusCode.Forbidden,
    message: 'AUTH.VERIFY_EMAIL_RESEND_MAX_RETRIES_ERROR',
    title: 'AUTH.VERIFY_EMAIL',
  },
  INVALID_EMAIL: { httpStatus: HttpStatusCode.BadRequest, statusCode: HttpStatusCode.BadRequest, message: 'ERRORS.INVALID_EMAIL', title: 'ERRORS.INVALID_EMAIL_TITLE' },
  DUPLICATE_EMAIL: {
    httpStatus: HttpStatusCode.BadRequest,
    statusCode: HttpStatusCode.BadRequest,
    message: 'ERRORS.DUPLICATE_EMAIL',
    title: 'ERRORS.DUPLICATE_EMAIL_TITLE',
    fieldName: 'email',
  },
  MAX_CALENDARS_REACHED: { httpStatus: HttpStatusCode.Forbidden, statusCode: 4002, message: 'ERRORS.MAX_CALENDARS_REACHED', title: 'ERRORS.MAX_CALENDARS_REACHED_TITLE' },
  PHONE_NUMBER_EXISTS: { httpStatus: HttpStatusCode.Conflict, statusCode: 4009, message: 'ERRORS.MOVE_TO_LOGIN', title: 'ERRORS.PHONE_NUMBER_EXISTS' },
  EMAIL_ALREADY_EXISTS: { httpStatus: HttpStatusCode.BadRequest, statusCode: HttpStatusCode.BadRequest, message: 'ERRORS.DUPLICATE_EMAIL', title: 'ERRORS.DUPLICATE_EMAIL_TITLE' },
};
