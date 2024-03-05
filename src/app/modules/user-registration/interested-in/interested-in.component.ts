import { Component, OnInit } from '@angular/core';
import { Genders } from '../data/genders';
import { HeaderService } from '../layout/header/header.service';
import { Gender } from '../models/unmatched.model';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-interested-in',
  templateUrl: './interested-in.component.html',
  styleUrls: ['./interested-in.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestedInComponent implements OnInit {
  public loading$ = this.userRegistrationService.loading;
  public interests: Array<{ value: Gender; label: string }> = Genders;

  public selectedInterest: { value: Gender; label: string };
  constructor(private userRegistrationService: UserRegistrationService, private headerService: HeaderService) {}

  ngOnInit(): void {
    if (this.userRegistrationService.unmatched?.interestedIn) {
      this.selectedInterest = this.interests.find((interest) => interest.value === this.userRegistrationService.unmatched?.interestedIn);
    } else {
      this.selectedInterest = this.interests[0];
    }
  }

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(50);
  }

  public onChange(selected: { value: Gender; label: string }): void {
    this.selectedInterest = selected;
  }

  public onContinue(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          interestedIn: this.selectedInterest.value,
        },
        'photos',
      )
      .subscribe();
  }
}
