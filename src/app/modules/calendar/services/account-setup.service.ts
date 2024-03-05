import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CalendarAccountModel } from 'src/app/models/calendar.account.model';
import { CalendarAccountEnum } from '../../../enums/calendar.account.enum';
import { CALENDAR_APIS } from '../../../lookups/api.lookups';
import { HttpUtilService } from '../../../services/http-utils.service';
import { BaseService } from '../../base/base.service';
import { CalendarAuthModel } from '../models/calendar-auth.model';

@Injectable({
  providedIn: 'root',
})
export class AccountSetupService extends BaseService<CalendarAccountModel> {
  constructor(private utilService: HttpUtilService) {
    super(CALENDAR_APIS.accounts.common.url, utilService);
  }

  /**
   * get the unmatched calendar accounts
   *
   * @param userId
   * @param params [ query parameters ]
   */
  public getCalendarAccounts(userId: string, params: { active?: boolean } = {}): Observable<CalendarAccountModel[]> {
    this.setLoading();
    return this.utilService.getRequest(CALENDAR_APIS.accounts.common.user + userId, params).pipe(
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  /**
   * authenticate Calendar
   *
   */
  public authenticateCalendar(type: CalendarAccountEnum): Observable<CalendarAuthModel> {
    this.setLoading();
    const url = type === CalendarAccountEnum.GOOGLE ? CALENDAR_APIS.accounts.google.authenticate : CALENDAR_APIS.accounts.microsoft.authenticate;
    return this.utilService.getRequest(url).pipe(
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }
}
