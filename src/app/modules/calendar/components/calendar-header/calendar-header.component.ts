import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRegistrationService } from 'src/app/modules/user-registration/services/user-registration.service';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { ICONS } from '../../../../theme/theme.icons';
import { CALENDAR_FILTERS } from '../../data/calendar-config';
import { DaysFilterModel } from '../../models/calendar.models';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent {
  @Input() title: string = '';
  @Input() loading: boolean;
  @Input() hideBackButton: boolean = false;
  @Output() addEvent: EventEmitter<void> = new EventEmitter<any>();
  @Output() manageEvent: EventEmitter<void> = new EventEmitter<any>();
  @Output() daysFilterEvent: EventEmitter<DaysFilterModel> = new EventEmitter<any>();
  public daysFilters: DaysFilterModel[] = CALENDAR_FILTERS;
  public selectedDayFilter: DaysFilterModel;
  public icons: any = this.commonUtil.icons;
  commonIcons = ICONS.commonIcons;

  /**
   * @constructor Represents Account takeover header component
   */
  constructor(private commonUtil: CommonUtilService, private userRegistrationService: UserRegistrationService) {}

  /** */
  public back(): void {
    this.userRegistrationService.routeBackinRegistrationFlow();
  }

  /**
   * on chose a day filter
   *
   * @param option
   */
  public filterEvents(option: DaysFilterModel): void {
    this.selectedDayFilter = option;
    this.daysFilterEvent.emit(option);
  }
}
