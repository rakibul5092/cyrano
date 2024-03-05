import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-goals-and-interests',
  templateUrl: './goals-and-interests.component.html',
  styleUrls: ['./goals-and-interests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalsAndInterestsComponent implements OnInit, OnDestroy {
  public loading$ = this.userRegistrationService.loading;
  public form: FormGroup;
  public percentage: number = 0;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService, private fb: FormBuilder, private cdref: ChangeDetectorRef) {}

  buildForm(): void {
    this.form = this.fb.group({
      friends: [false, [Validators.required]],
      relationships: [false, [Validators.required]],
      interests: [30, [Validators.required]],
    });
    this.form.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((x) => (this.percentage = this.userRegistrationService.rangeMeterCalculations({ ...this.userRegistrationService.unmatched.datingPreferences, ...x })));
  }

  ionViewWillEnter = (): void => {
    this.percentage = this.userRegistrationService.rangeMeterCalculations({ ...this.userRegistrationService.unmatched.datingPreferences, ...this.form.value });
    this.cdref.detectChanges();
    this.headerService.showHelp$.next({ visible: true, route: '' });
    this.headerService.headerTitle$.next({ visible: true, title: 'HEADER_TITLES.DATE_PREFERENCES' });
    this.headerService.headerProgress$.next(68.75);
  };

  ionViewWillLeave = (): void => {
    this.headerService.showHelp$.next({ visible: false, route: '' });
  };

  isFormInvalid() {
    return !this.form.get('friends').value && !this.form.get('relationships').value;
  }

  ngOnInit(): void {
    this.buildForm();

    this.form.patchValue({
      interests: this.userRegistrationService.unmatched?.datingPreferences.interests,
      friends: this.userRegistrationService.unmatched?.datingPreferences.friends,
      relationships: this.userRegistrationService.unmatched?.datingPreferences.relationships,
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onContinue(): void {
    if (!this.isFormInvalid()) {
      this.userRegistrationService
        .routeToNextPage(
          {
            datingPreferences: {
              ...this.userRegistrationService.unmatched.datingPreferences,
              interests: this.form.value.interests,
              friends: this.form.value.friends,
              relationships: this.form.value.relationships,
            },
          },
          'ageHeight',
        )
        .subscribe();
    }
  }
}
