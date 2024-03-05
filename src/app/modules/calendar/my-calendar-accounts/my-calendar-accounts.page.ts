import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, takeUntil } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { environment } from '../../../../environments/environment';
import { CalendarAccountEnum, CalendarAccountIconsEnum } from '../../../enums/calendar.account.enum';
import { AlertTypes, modalConfig, sheetModalConfig } from '../../../lookups/app.lookups';
import { APPLICATION_ERRORS } from '../../../lookups/error.codes.lookup';
import { CalendarAccountModel, DEFAULT_ACCOUNT_THEME } from '../../../models/calendar.account.model';
import { AlertService } from '../../../services/alert.service';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { ExceptionsService } from '../../../services/exceptions.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';
import { AccountThemeComponent } from '../components/account-theme/account-theme.component';
import { CalendarAuthModel } from '../models/calendar-auth.model';
import { AccountSetupService } from '../services/account-setup.service';

@Component({
  selector: 'app-my-calendar-accounts',
  templateUrl: './my-calendar-accounts.page.html',
  styleUrls: ['./my-calendar-accounts.page.scss'],
})
export class MyCalendarAccountsPage implements OnInit, OnDestroy {
  public icons = this.commonUtil.icons;
  public calendarAccountIcons = CalendarAccountIconsEnum;
  public accountTypes = CalendarAccountEnum;
  public loading$: Observable<boolean>;
  public calendarAccounts: CalendarAccountModel[] = [];
  private destroy$: Subject<void> = new Subject();
  private userId: string;
  private addingCalendarAccount: boolean;

  constructor(
    private commonUtil: CommonUtilService,
    private exceptionsService: ExceptionsService,
    private modalController: ModalController,
    private alertService: AlertService,
    private accountSetupService: AccountSetupService,
    private cacheService: CacheService,
    private userRegistrationService: UserRegistrationService,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.accountSetupService.loading;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ionViewWillEnter(): void {
    const currentUser = this.cacheService.getSessionData(CacheKeys.user) || JSON.parse(localStorage.getItem('unmatched'));
    if (currentUser) {
      this.getCalendarAccounts(currentUser._id);
    }
  }

  /**
   * add or edit account
   *
   * @param type
   */
  public addAccount(type: CalendarAccountEnum): void {
    if (this.addingCalendarAccount) {
      return;
    }
    this.accountSetupService
      .authenticateCalendar(type)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (calendarAuthModel: CalendarAuthModel) => {
          const left = screen.width / 2 - 500 / 2;
          const top = screen.height / 2 - 650 / 2;
          window.open(calendarAuthModel.url, '', `location=1,status=1,scrollbars=1, width=500,height=650, left=${left}, top=${top}`);
          window.addEventListener('message', (message: any) => this.listenToAccountEvent(type, message), true);
        },
        error: () => this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'ACCOUNT_SETUP.ACCOUNT_ADD_FAILED', AlertTypes.error),
      });
  }

  /**
   * delete calendar account
   *
   * @param index
   * @param account
   */
  public async deleteCalendarAccount(index: number, account: CalendarAccountModel): Promise<void> {
    const modal = await this.modalController.create({ ...modalConfig, component: ConfirmModalComponent });
    await modal.present();
    const modalData = await modal.onWillDismiss();
    if (modalData) {
      if (modalData.data?.confirmed) {
        this.accountSetupService
          .delete(account)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            complete: () => {
              this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'ACCOUNT_SETUP.ACCOUNT_DELETED_SUCCESSFULLY', AlertTypes.success);
              this.calendarAccounts.splice(index, 1);
            },
            error: async (error) => await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.INVALID_EMAIL]),
          });
      }
    }
  }

  /**
   * delete calendar account
   *
   * @param index
   * @param account
   */
  public async editTheme(index: number, account: CalendarAccountModel): Promise<void> {
    const accountThemeModal = await this.modalController.create({
      ...sheetModalConfig,
      initialBreakpoint: 0.4,
      component: AccountThemeComponent,
      componentProps: { calendarAccount: account },
    });
    await accountThemeModal.present();
    const accountThemeModalData = await accountThemeModal.onWillDismiss();
    if (accountThemeModalData && accountThemeModalData.data && accountThemeModalData.data.updatedAccount) {
      this.calendarAccounts[index] = accountThemeModalData.data.updatedAccount;
    }
  }

  /**
   * active or de-active calendar account
   *
   * @param index
   * @param account
   */
  public async activeCalendarAccount(index: number, account: CalendarAccountModel): Promise<void> {
    this.updateCalendarRequest(
      { ...account, active: !account.active },
      index,
      account.active ? 'ACCOUNT_SETUP.ACCOUNT_DEACTIVATED_SUCCESSFULLY' : 'ACCOUNT_SETUP.ACCOUNT_ACTIVATED_SUCCESSFULLY',
    );
  }

  /**
   * on next button clicked
   */
  public next(): void {
    this.userRegistrationService.routeToNextPage({}, 'calendar').subscribe();
  }

  /**
   * get the current user calendar accounts
   *
   * @param userId
   */
  private getCalendarAccounts(userId: string): void {
    this.userId = userId;
    this.accountSetupService
      .getCalendarAccounts(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (calendars) => {
          this.calendarAccounts = calendars;
        },
        error: async () => await this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'CALENDAR.GET_CALENDARS_FAILED', AlertTypes.error),
      });
  }

  /**
   * update calendar request
   *
   * @param account
   * @param index
   * @param successMessage
   * @private
   */
  private updateCalendarRequest(account: CalendarAccountModel, index: number = -1, successMessage: string = 'ACCOUNT_SETUP.ACCOUNT_SAVED_SUCCESSFULLY'): void {
    this.addingCalendarAccount = true;
    this.accountSetupService
      .update(account)
      .pipe(
        finalize(() => (this.addingCalendarAccount = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (updatedAccount: CalendarAccountModel) => {
          this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', successMessage, AlertTypes.success);
          if (index > -1) {
            this.calendarAccounts[index] = updatedAccount;
          } else {
            this.calendarAccounts.push(updatedAccount);
            window.removeEventListener('message', (msg: any) => this.listenToAccountEvent(account.type, msg), true);
          }
        },
        error: async (error) =>
          await this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.INVALID_EMAIL, APPLICATION_ERRORS.DUPLICATE_EMAIL, APPLICATION_ERRORS.MAX_CALENDARS_REACHED]),
      });
  }

  private listenToAccountEvent(type, message: any): void {
    if (this.userId && message && message.data && message.origin + '/' === environment.url && !this.addingCalendarAccount) {
      if (message.data.token && message.data.email) {
        if (this.calendarAccounts.find((value) => value.email === message.data.email && value.type === type)) {
          this.alertService.alertException(APPLICATION_ERRORS.DUPLICATE_EMAIL);
          return;
        }
        this.updateCalendarRequest({
          userId: this.userId,
          token: message.data.token,
          email: message.data.email,
          type,
          active: true,
          theme: DEFAULT_ACCOUNT_THEME,
        });
      }
      if (message.data.error) {
        this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'ACCOUNT_SETUP.ACCOUNT_ADD_FAILED', AlertTypes.error);
        window.removeEventListener('message', (msg: any) => this.listenToAccountEvent(type, msg), true);
      }
    }
  }
}
