import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-age-and-height',
  templateUrl: './age-and-height.component.html',
  styleUrls: ['./age-and-height.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeAndHeightComponent implements OnInit {
  public htmlAgeRange = PreferencesSwipesModules.AgeAndHeight.ageRange;
  public ageRange = { lower: PreferencesSwipesModules.AgeAndHeight.ageRange.min, upper: PreferencesSwipesModules.AgeAndHeight.ageRange.max };
  public heightRange = { lower: 4.3, upper: 5.7 };
  public loading$ = this.userRegistrationService.loading;
  public percentage: number = 0;

  /**
   * @param headerService
   * @param userRegistrationService
   * @param cdref
   */
  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService, private cdref: ChangeDetectorRef) {}

  public calculatePercentage(): void {
    this.percentage = this.userRegistrationService.rangeMeterCalculations({
      ...this.userRegistrationService.unmatched.datingPreferences,
      age: this.ageRange,
      height: this.heightRange,
    });
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    if (this.userRegistrationService.unmatched?.datingPreferences?.age) {
      this.ageRange = {
        lower: Number(this.userRegistrationService.unmatched?.datingPreferences?.age?.min ?? 20),
        upper: Number(this.userRegistrationService.unmatched?.datingPreferences?.age?.max ?? 80),
      };
    }

    if (this.userRegistrationService.unmatched?.datingPreferences?.height) {
      this.heightRange = {
        lower: Number(this.userRegistrationService.unmatched?.datingPreferences?.height?.min ?? 4.3),
        upper: Number(this.userRegistrationService.unmatched?.datingPreferences?.height?.max ?? 5.7),
      };
    }
  }

  // Visible/hide header help button
  ionViewWillEnter(): void {
    this.calculatePercentage();
    this.headerService.showHelp$.next({ visible: true, route: '' });
    this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.DATE_PREFERENCES' });
    this.headerService.headerProgress$.next(75);
  }

  ionViewWillLeave(): void {
    this.headerService.showHelp$.next({ visible: false, route: '' });
  }

  /**
   * Route next component
   */
  public onContinue(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          datingPreferences: {
            ...this.userRegistrationService.unmatched.datingPreferences,
            age: {
              min: this.ageRange.lower.toString(),
              max: this.ageRange.upper.toString(),
            },
            height: {
              min: this.heightRange.lower.toString(),
              max: this.heightRange.upper.toString(),
            },
          },
        },
        'faceEthnicity',
        false,
      )
      .subscribe();
  }
}
