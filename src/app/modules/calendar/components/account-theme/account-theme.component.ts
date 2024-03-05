import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CalendarAccountEnum } from '../../../../enums/calendar.account.enum';
import { AlertTypes } from '../../../../lookups/app.lookups';
import { CalendarAccountModel, CalendarAccountThemeModel, DEFAULT_ACCOUNT_THEME } from '../../../../models/calendar.account.model';
import { AlertService } from '../../../../services/alert.service';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { AccountSetupService } from '../../services/account-setup.service';

@Component({
  selector: 'app-account-theme',
  templateUrl: './account-theme.component.html',
  styleUrls: ['./account-theme.component.scss'],
})
export class AccountThemeComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading: boolean;
  public calendarAccount: CalendarAccountModel;
  public form: FormGroup;
  public accountTypes = CalendarAccountEnum;
  public icons = this.commonUtilService.icons;
  private destroy$: Subject<void> = new Subject();
  private initialValues: CalendarAccountThemeModel;

  constructor(
    public fb: FormBuilder,
    private commonUtilService: CommonUtilService,
    private alertService: AlertService,
    private modalController: ModalController,
    private accountSetupService: AccountSetupService,
    private navParams: NavParams,
  ) {}

  ngOnInit(): void {
    this.buildForm(this.navParams.get('calendarAccount') || {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.initialValues = this.form.value;
  }

  /**
   * on save account Theme
   */
  public saveTheme(): void {
    if (this.form.valid) {
      if (this.commonUtilService.deepEqual(this.initialValues, this.form.value)) {
        this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'COMMON_ALERTS.NO_CHANGES', AlertTypes.warning);
        this.modalController.dismiss(null, 'confirm');
        return;
      }
      this.loading = true;
      this.accountSetupService
        .update(
          {
            ...this.calendarAccount,
            theme: this.form.value,
          },
          false,
        )
        .pipe(takeUntil(this.destroy$))
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (updatedAccount: CalendarAccountModel) => {
            this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'COMMON_ALERTS.SAVING_SUCCESSFULLY', AlertTypes.success);
            this.modalController.dismiss({ updatedAccount }, 'confirm');
          },
          error: async () => await this.alertService.alert('ACCOUNT_SETUP.MY_CALENDER_ACCOUNTS', 'COMMON_ALERTS.SAVING_ERROR', AlertTypes.error),
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  /**
   * build calendar account theme form
   *
   * @private
   */
  private buildForm(calendarAccount): void {
    this.calendarAccount = calendarAccount;
    this.calendarAccount.theme = calendarAccount.theme || DEFAULT_ACCOUNT_THEME;
    this.form = this.fb.group({
      backgroundColor: [this.calendarAccount.theme.backgroundColor, [Validators.required]],
      foregroundColor: [this.calendarAccount.theme.foregroundColor, [Validators.required]],
      borderColor: [this.calendarAccount.theme.borderColor, [Validators.required]],
    });
  }
}
