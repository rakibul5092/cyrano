import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Genders } from '../data/genders';
import { HeaderService } from '../layout/header/header.service';
import { Gender } from '../models/unmatched.model';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-select-gender',
  templateUrl: './select-gender.component.html',
  styleUrls: ['./select-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGenderComponent implements OnInit {
  public genders: Array<{ value: Gender; label: string }> = Genders;

  public selectedGender: { value: Gender; label: string };
  public loading$ = this.userRegistrationService.loading;

  constructor(private userRegistrationService: UserRegistrationService, private headerService: HeaderService) {}

  ngOnInit(): void {
    if (this.userRegistrationService.unmatched?.gender) {
      this.selectedGender = this.genders.find((genders) => genders.value === this.userRegistrationService.unmatched?.gender);
    } else {
      this.selectedGender = this.genders[0];
    }
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(43.75);
  }

  /**
   * @param gender
   */
  public onGenderChange(gender: { value: Gender; label: string }): void {
    this.selectedGender = gender;
  }

  /**
   * Continue to next component
   */
  public onContinue(): void {
    this.userRegistrationService.routeToNextPage({ gender: this.selectedGender.value }, 'interestedGender').subscribe();
  }
}
