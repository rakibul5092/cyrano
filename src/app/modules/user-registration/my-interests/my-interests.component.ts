import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AlertTypes } from 'src/app/lookups/app.lookups';
import { AlertService } from 'src/app/services/alert.service';
import { HeaderService } from '../layout/header/header.service';
import { PersonalInterest } from '../models/personal-interest.model';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-my-interests',
  templateUrl: './my-interests.component.html',
  styleUrls: ['./my-interests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyInterestsComponent implements OnInit {
  public myInterestsArray: PersonalInterest[] = [];
  public selectedInterestsArray: PersonalInterest[] = [];
  public loading$ = this.userRegistrationService.loading;

  /**
   * @param formBuilder
   */
  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService, private alertService: AlertService, private cdr: ChangeDetectorRef) {}

  /***/
  ngOnInit(): void {
    this.userRegistrationService
      .getPersonalInterests()
      .pipe(
        tap((personalInterests) => {
          this.userRegistrationService.unmatched?.personalInterests?.forEach((personalInterest) => {
            personalInterests.find((interest) => {
              if (interest._id === personalInterest._id) {
                interest.selected = true;
              }
            });
          });
          this.myInterestsArray = personalInterests;
          this.selectedInterestsArray = this.myInterestsArray.filter((myInterest) => myInterest.selected);
          this.cdr.detectChanges();
        }),
      )
      .subscribe();
  }

  // Visible/hide header skip button
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(37.5);
    this.cdr.detectChanges();
  }

  /**
   * @param interest
   */
  public onInterestClick(interest: { name: string; selected: boolean }): void {
    if (this.selectedInterestsArray.length < 5 || interest.selected) {
      interest.selected = !interest.selected;
      this.selectedInterestsArray = this.myInterestsArray.filter((myInterest) => myInterest.selected);
    } else {
      this.alertService.alert('', 'UNMATCHED_USER.MAXIMUM_NUMBER_OF_INTEREST_SELECTED', AlertTypes.error);
    }
  }

  /**
   * Continue to next componennt
   */
  public onContinue(): void {
    if (this.selectedInterestsArray.length >= 5) {
      this.userRegistrationService
        .routeToNextPage(
          {
            personalInterests: this.myInterestsArray
              .filter((myInterest) => myInterest.selected)
              .map((myInterest) => {
                return {
                  createdAt: myInterest.createdAt,
                  _id: myInterest._id,
                  name: myInterest.name,
                  active: myInterest.active,
                };
              }),
          },
          'gender',
        )
        .subscribe();
    }
  }
}
