import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APPLICATION_ERRORS, ExceptionType } from '../lookups/error.codes.lookup';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class ExceptionsService {
  /***/
  constructor(public router: Router, private alertService: AlertService) {}

  /**
   * handle a given list of exceptions
   *
   * @param errorResponse is the http error
   * @param exceptions is the expected given list of exceptions
   */
  public async handleExceptions(errorResponse: any, exceptions: ExceptionType[]): Promise<void> {
    for (const exception of exceptions) {
      const error = errorResponse && errorResponse.error ? errorResponse.error.data : null;
      if (error && error.statusCode) {
        if ((error.fieldName && error.fieldName === exception.fieldName) || (error.statusCode === exception.statusCode && !exception.fieldName)) {
          await this.alertService.alertException(exception);
        }
      }
    }
  }

  /**
   * handle general exceptions like unauthorized, not found , time out .. etc
   *
   * @param errorResponse
   */
  public async handleGeneralExceptions(errorResponse: any): Promise<void> {
    if (errorResponse && errorResponse.error && errorResponse.error.data && errorResponse.error.data.statusCode) {
      switch (errorResponse.error.data.statusCode) {
        case HttpStatusCode.Unauthorized: {
          await this.alertService.alertException(APPLICATION_ERRORS.UNAUTHORIZED_ERROR);
          setTimeout(() => {
            this.router.navigate(['../auth']);
          }, 500);
          break;
        }
        case HttpStatusCode.RequestTimeout: {
          await this.alertService.alertException(APPLICATION_ERRORS.TIME_OUT_ERROR);
          break;
        }
      }
    } else {
      await this.alertService.alertException(APPLICATION_ERRORS.SERVER_ERROR);
    }
  }
}
