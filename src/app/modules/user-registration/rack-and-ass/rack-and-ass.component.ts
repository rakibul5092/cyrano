import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderService } from '../layout/header/header.service';
import { SelectOption } from '../models/select-option.model';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-rack-and-ass',
  templateUrl: './rack-and-ass.component.html',
  styleUrls: ['../face-and-ethnicity/face-and-ethnicity.component.scss', './rack-and-ass.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RackAndAssComponent implements OnInit {
  public form: FormGroup;
  public loading$ = this.userRegistrationService.loading;
  public racks: SelectOption[];
  public asses: SelectOption[];
  public percentage: number = 0;

  /**
   * @param formBuilder
   * @param headerService
   */
  constructor(private formBuilder: FormBuilder, private headerService: HeaderService, private userRegistrationService: UserRegistrationService, private cdref: ChangeDetectorRef) {}

  /***/
  ngOnInit(): void {
    this.buildForm();

    this.racks = this.userRegistrationService.racks.map((a) => {
      return { ...a };
    });

    this.asses = this.userRegistrationService.asses.map((a) => {
      return { ...a };
    });

    this.userRegistrationService.unmatched?.datingPreferences?.rack?.forEach((rack) => {
      this.onRackSelection(this.racks.find((rackOption) => rackOption.name === rack));
    });

    this.userRegistrationService.unmatched?.datingPreferences?.ass?.forEach((ass) => {
      this.onAssSelection(this.asses.find((assOption) => assOption.name === ass));
    });

    this.form.valueChanges.subscribe(() => this.calculatePercentage());
  }

  public calculatePercentage(): void {
    this.percentage = this.userRegistrationService.rangeMeterCalculations({
      ...this.userRegistrationService.unmatched.datingPreferences,
      rack: this.racks.filter((f) => f.selected),
      ass: this.asses.filter((e) => e.selected),
    });
    this.cdref.detectChanges();
  }

  // Visible/Hide header help button
  ionViewWillEnter = (): void => {
    this.calculatePercentage();
    this.headerService.showHelp$.next({ visible: true, route: '' });
    this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.DATE_PREFERENCES' });
  };

  /**
   * Help and title visibility
   */
  ionViewWillLeave = (): void => {
    this.headerService.showHelp$.next({ visible: false, route: '' });
    this.headerService.headerTitle$.next({ visible: false, title: '' });
  };

  /**
   * @param face
   */
  public onRackSelection(rack: SelectOption): void {
    rack.selected = !rack.selected;
    this.toggleSelection(rack, 'racks');
  }

  /**
   * @param face
   */
  public onAssSelection(ass: SelectOption): void {
    ass.selected = !ass.selected;
    this.toggleSelection(ass, 'asses');
  }

  /**
   * Continue to next component
   */
  public onContinue(): void {
    const rack = this.racks.filter((f) => f.selected).map((f) => f.name);
    const ass = this.asses.filter((e) => e.selected).map((e) => e.name);
    if (rack.length && ass.length) {
      this.userRegistrationService
        .routeToNextPage(
          {
            datingPreferences: {
              ...this.userRegistrationService.unmatched.datingPreferences,
              rack,
              ass,
            },
          },
          'swipe',
          false,
        )
        .subscribe();
    }
  }

  /**
   * Building form
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      racks: [[], [Validators.required, Validators.minLength(1)]],
      asses: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  /**
   * toggle rack and ass selection
   *
   * @param item
   * @param formControlName
   */
  private toggleSelection(item: SelectOption, formControlName: string): void {
    let arr = Array.from(this.form.get(formControlName).value);

    if (item.selected) {
      arr.push(item);
    } else {
      arr = arr.filter((arrItem: SelectOption) => arrItem.name !== item.name);
    }
    this.form.get(formControlName).patchValue(arr);
  }
}
