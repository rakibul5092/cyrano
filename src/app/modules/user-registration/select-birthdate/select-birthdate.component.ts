import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-select-birthdate',
  templateUrl: './select-birthdate.component.html',
  styleUrls: ['./select-birthdate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBirthdateComponent implements OnInit {
  public birthdayForm: FormGroup;
  public currentDate: string;
  public maxDate: string;
  public selectionEnabled = false;
  public loading$ = this.userRegistrationService.loading;

  public placeholders = [
    {
      placeholder: 'UNMATCHED_USER.DAY',
      formControlName: 'day',
    },
    {
      placeholder: 'UNMATCHED_USER.MONTH',
      formControlName: 'month',
    },
    {
      placeholder: 'UNMATCHED_USER.YEAR',
      formControlName: 'year',
    },
  ];

  /**
   * @param formBuilder
   * @param datePipe
   */
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private userRegistrationService: UserRegistrationService, private headerService: HeaderService) {}

  /***/
  ngOnInit(): void {
    this.buildForm();

    if (this.userRegistrationService.unmatched?.birthDate) {
      const date = new Date(this.userRegistrationService.unmatched?.birthDate);
      this.birthdayForm.patchValue({
        date: this.userRegistrationService.unmatched?.birthDate,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(31.25);
  }

  /**
   * @param event
   */
  public onModalDismiss(): void {
    this.selectionEnabled = false;
  }

  /**
   * @param event
   */
  public onDateChange(event): void {
    if (event.detail.value !== '') {
      this.selectionEnabled = false;
      const date = new Date(event.detail.value || this.currentDate);
      this.birthdayForm.patchValue({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
  }

  /**
   * Continue to next component
   */
  public onContinue(): void {
    if (this.birthdayForm.valid && !this.selectionEnabled) {
      this.userRegistrationService.routeToNextPage({ birthDate: this.birthdayForm.get('date').value }, 'interests').subscribe();
    }
  }

  /***/
  private buildForm(): void {
    const existingBirthdayString = this.userRegistrationService.unmatched?.birthDate;
    const existingBirthday = existingBirthdayString ? new Date(existingBirthdayString) : null;
    let date = new Date();
    date = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
    this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.birthdayForm = this.formBuilder.group({
      date: [existingBirthday ?? null],
      day: [existingBirthday ? existingBirthday.getDate() : null, [Validators.required, Validators.min(1), Validators.max(31), Validators.pattern('^[0-9]*$')]],
      month: [existingBirthday ? existingBirthday.getMonth() + 1 : null, [Validators.required, Validators.maxLength(3)]],
      year: [existingBirthday ? existingBirthday.getFullYear() : null, [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
}
