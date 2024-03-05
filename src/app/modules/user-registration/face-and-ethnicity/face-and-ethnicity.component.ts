import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../layout/header/header.service';
import { SelectOption } from '../models/select-option.model';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-face-and-ethnicity',
  templateUrl: './face-and-ethnicity.component.html',
  styleUrls: ['./face-and-ethnicity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaceAndEthnicityComponent implements OnInit {
  public form: FormGroup;
  public loading$ = this.userRegistrationService.loading;
  public ethnicities: SelectOption[];
  public percentage: number = 0;

  /**
   * @param formBuilder
   * @param headerService
   * @param userRegistrationService
   */
  constructor(private formBuilder: FormBuilder, private headerService: HeaderService, private userRegistrationService: UserRegistrationService, private cdref: ChangeDetectorRef) {}

  /***/
  ngOnInit(): void {
    this.buildForm();

    this.ethnicities = this.userRegistrationService.ethnicities.map((a) => {
      return { ...a };
    });

    this.userRegistrationService.unmatched?.datingPreferences?.ethnicity?.forEach((ethnicity) => {
      this.onEthnicitySelection(this.ethnicities.find((ethnicityOption) => ethnicityOption.name === ethnicity));
    });

    this.form.valueChanges.subscribe(() => this.calculatePercentage());
  }

  public calculatePercentage(): void {
    this.percentage = this.userRegistrationService.rangeMeterCalculations({
      ...this.userRegistrationService.unmatched.datingPreferences,
      face: this.form.value.face,
      ethnicity: this.ethnicities.filter((e) => e.selected),
    });
    this.cdref.detectChanges();
  }

  // Visible/Hide header help button
  ionViewWillEnter(): void {
    this.calculatePercentage();
    this.headerService.showHelp$.next({ visible: true, route: '' });
    this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.DATE_PREFERENCES' });
    this.headerService.headerProgress$.next(81.25);
  }

  ionViewWillLeave(): void {
    this.headerService.showHelp$.next({ visible: false, route: '' });
  }

  /**
   * Toggle Ethnicity selection
   *
   * @param ethnicity
   */
  public onEthnicitySelection(ethnicity: SelectOption): void {
    ethnicity.selected = !ethnicity.selected;
    this.toggleSelection(ethnicity, 'ethnicities');
  }

  /**
   * Route to next component
   */
  public onContinue(): void {
    if (this.form.valid) {
      this.userRegistrationService
        .routeToNextPage(
          {
            datingPreferences: {
              ...this.userRegistrationService.unmatched.datingPreferences,
              face: this.form.value.face,
              ethnicity: this.ethnicities.filter((e) => e.selected).map((e) => e.name),
            },
          },
          'rackAss',
          false,
        )
        .subscribe();
    }
  }

  /**
   * Building Form
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      face: [6, [Validators.required]],
      ethnicities: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  /**
   * @param item
   * @param formControlName
   */
  private toggleSelection(item: any, formControlName: string): void {
    let arr = Array.from(this.form.get(formControlName).value);

    if (item.selected) {
      arr.push(item);
    } else {
      arr = arr.filter((arrItem: any) => arrItem.name !== item.name);
    }
    this.form.get(formControlName).patchValue(arr);
  }
}
