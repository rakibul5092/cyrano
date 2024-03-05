import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';

import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';
import { SSN_MASK } from '../../../../lookups/app.lookups';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { dateTimePresentation, SelectedDateModel } from '../../../shared/components/date-time/date-time.config';
import { DateTimeService } from '../../../shared/components/date-time/date-time.service';

@Component({
  selector: 'app-background-check',
  templateUrl: './background-check.component.html',
  styleUrls: ['./background-check.component.scss'],
})
export class BackgroundCheckComponent implements OnInit {
  public ssnMask: string = SSN_MASK;
  public presentation = dateTimePresentation;
  public form: FormGroup;
  public loading: boolean;
  private birthdateMin: Date;
  private birthdateMax: Date;

  constructor(private fb: FormBuilder, private dateTimeService: DateTimeService, private commonUtilService: CommonUtilService, private headerService: HeaderService) {}

  ngOnInit(): void {
    this.buildForm();
    this.setBirthDateMinMax();
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(84.6);
  }

  /**
   * on submit
   */
  public onSubmit(): void {
    if (this.form.valid) {
      this.commonUtilService.navigate('../guru-registration/money-goals');
    }
  }

  /**
   * on select date or time
   *
   * @param event
   * @param presentation
   * @param controlName
   */
  public async openDateTimePicker(event, presentation: dateTimePresentation, controlName: string): Promise<void> {
    event.stopPropagation();
    event.preventDefault();
    const selectedValue: SelectedDateModel = await this.dateTimeService.openDateTimePicker(presentation, null, this.birthdateMax, this.birthdateMin);
    if (selectedValue) {
      this.form.controls[controlName].setValue(selectedValue.formattedValue);
    }
  }

  /**
   * build background check form group
   *
   * @private
   */
  private buildForm(): void {
    this.form = this.fb.group({
      ssn: new UntypedFormControl('', [Validators.required]),
      zip: new UntypedFormControl('', [Validators.required, Validators.minLength(5)]),
      birthDate: new UntypedFormControl('', [Validators.required]),
    });
  }

  /**
   * set min anf max birthDate
   *
   * @private
   */
  private setBirthDateMinMax(): void {
    const min = new Date();
    const max = new Date();
    min.setFullYear(min.getFullYear() - 80);
    max.setFullYear(max.getFullYear() - 18);
    this.birthdateMin = min;
    this.birthdateMax = max;
  }
}
