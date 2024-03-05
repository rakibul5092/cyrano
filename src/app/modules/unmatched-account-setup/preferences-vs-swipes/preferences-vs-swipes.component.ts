import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, concatMap, finalize, startWith, takeUntil, tap } from 'rxjs';
import * as PreferencesSwipesModules from 'src/app/constants/PreferencesSwipesModules';
import { AlertTypes } from 'src/app/lookups/app.lookups';
import { UnmatchedDatingPreferencesResponse } from 'src/app/modules/unmatched-account-setup/models/unmatched-dating-preferences.response.model';
import * as Operations from 'src/app/modules/unmatched-account-setup/preferences-vs-swipes/util/preferences-vs-swipes.operations';
import { AlertService } from 'src/app/services/alert.service';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { HeaderService } from '../../user-registration/layout/header/header.service';
import { UserRegistrationService } from '../../user-registration/services/user-registration.service';
import { AgeAndHeightService } from './age-and-height/age-and-height.service';
import { FaceAndEthnicityService } from './face-and-ethnicity/face-and-ethnicity.service';
import { PreferencesVsSwipesService } from './preferences-vs-swipes.service';
import { RackAndAssService } from './rack-and-ass/rack-and-ass.service';
import { SelectableItemService } from './selectable-item/selectableitem.service';

@Component({
  selector: 'app-preferences-vs-swipes',
  templateUrl: './preference-vs-swipes.component.html',
  styleUrls: ['./preference-vs-swipes.component.scss'],
})
export class PreferencesVsSwipesComponent implements OnInit, OnDestroy {
  public selectedTab: string = 'ageAndHeight';
  public tabs = ['ageAndHeight', 'faceAndEthnicity', 'rackAndAss'];
  public prefModuleNames = [
    { name: PreferencesSwipesModules.AgeAndHeight.name, modalTitle: PreferencesSwipesModules.AgeAndHeight.modalTitle },
    { name: PreferencesSwipesModules.FaceAndEthnicity.name, modalTitle: PreferencesSwipesModules.FaceAndEthnicity.modalTitle },
    { name: PreferencesSwipesModules.RackAndAss.name, modalTitle: PreferencesSwipesModules.RackAndAss.modalTitle },
  ];

  /**
   * This currentModule means the tab that is visible to the user
   * so the default value has been set to 'age-height' module by default
   * since that will be the first module
   */
  public currentModule: string = PreferencesSwipesModules.AgeAndHeight.name;

  public editExplicit: boolean = false;
  public editImplicit: boolean = false;
  public htmlAgeRange = PreferencesSwipesModules.AgeAndHeight.ageRange;
  public ageRange = { lower: 0, upper: 0 };
  public heightRange = { lower: 0, upper: 0 };
  public faceValue: Number = 0;
  public savingData: boolean = false;

  public ethnicities: Array<PreferencesSwipesModules.EthnicitieRackAssType> = [
    { name: 'Asian', selected: false },
    { name: 'African', selected: false },
    { name: 'White', selected: false },
    { name: 'Latino', selected: false },
    { name: 'Black', selected: false },
  ];

  public racks: Array<PreferencesSwipesModules.EthnicitieRackAssType> = [
    { name: 'Less', selected: false },
    { name: 'Handful', selected: false },
    { name: 'More', selected: false },
  ];
  public asses: Array<PreferencesSwipesModules.EthnicitieRackAssType> = [
    { name: 'Less', selected: false },
    { name: 'Handful', selected: false },
    { name: 'More', selected: false },
  ];
  public payload: UnmatchedDatingPreferencesResponse;
  public progress = 60;

  implicitFormGroup: FormGroup;
  loadingProgressBar: boolean = false;
  private destroy$: Subject<void> = new Subject();

  /**
   * @param commonService
   */
  constructor(
    public commonService: CommonUtilService,
    private headerService: HeaderService,
    public prefSwipeService: PreferencesVsSwipesService,
    private selectService: SelectableItemService,
    private ageHeightService: AgeAndHeightService,
    private faceEthnicityService: FaceAndEthnicityService,
    private rackAssService: RackAndAssService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private userRegistrationService: UserRegistrationService,
  ) {
    this.prefSwipeService.currentModule.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.currentModule = e;
    });

    this.implicitFormGroup = new FormGroup({
      addMore: new FormControl(true),
      reset: new FormControl(false),
    });
  }

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerTitle$.next({ visible: true, title: 'UNMATCHED_ACCOUNT_SETUP.SUMMARY_SECTION' });

    this.userRegistrationService
      .saveLikesDislikes()
      .pipe(concatMap(() => this.prefSwipeService.getData()))
      .subscribe((response: UnmatchedDatingPreferencesResponse) => {
        this.setData(response);
        this.changeDetectorRef.detectChanges();
      });

    const unmatched = this.userRegistrationService.unmatched;
    const implicitResetButton = this.implicitFormGroup.get('reset');

    if (unmatched.numberOfProfilesSwiped === 0 || unmatched.disLikes?.length + unmatched.likes?.length === 0) implicitResetButton.setValue(false);
    else implicitResetButton.setValue(true);
  }

  ionViewWillLeave(): void {
    this.headerService.headerTitle$.next({ visible: false, title: '' });
  }

  /***/
  ngOnInit(): void {
    this.initRadialProgress(this.progress);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setData(pfswres: UnmatchedDatingPreferencesResponse): void {
    this.payload = pfswres;
    this.ageHeightService.setData(this.payload);
    this.updateModalAgeHeight();

    this.rackAssService.setData(this.payload);
    this.faceEthnicityService.setData(this.payload);

    this.selectService.currentItem.subscribe((e: any) => {
      const title = e.item.title;
      if (title === PreferencesSwipesModules.Modules.ImplicitFormResult.title) {
        this.showImplicitEditModal();
      } else if (title === PreferencesSwipesModules.Modules.ExplicitFormResult.title) {
        this.showExplicitEditModal();
      }
    });
    switch (pfswres?.preferredType) {
      case PreferencesSwipesModules.PreferredType.IMPLICIT: {
        this.prefSwipeService.changeSelectedItem(PreferencesSwipesModules.PreferredTypeIndex.IMPLICIT);
        break;
      }
      case PreferencesSwipesModules.PreferredType.EXPLICIT: {
        this.prefSwipeService.changeSelectedItem(PreferencesSwipesModules.PreferredTypeIndex.EXPLICIT);
        break;
      }
      case PreferencesSwipesModules.PreferredType.COMBINED: {
        this.prefSwipeService.changeSelectedItem(PreferencesSwipesModules.PreferredTypeIndex.COMBINED);
        break;
      }
    }
  }

  public setFaceValue(value: Number): void {
    this.faceValue = value || 0;
  }

  public onContinue(): void {
    if (this.prefSwipeService.selectedTabItemIndex === null) {
      this.alertService.alert('UNMATCHED_USER.PREFERENCES_VS_SWIPES_TITLE', 'UNMATCHED_USER.SELECT_SWIPE_RESULT', AlertTypes.warning);
      return;
    }
    this.payload.preferredType = PreferencesSwipesModules.SelectableItem[this.prefSwipeService.selectedTabItemIndex];
    const payload = {
      age: { min: NaN, max: NaN },
      height: { min: NaN, max: NaN },
      face: NaN,
      ethnicity: [],
      rack: [],
      ass: [],
      preferredType: null,
    };
    for (const key in this.payload[PreferencesSwipesModules.PreferredType.EXPLICIT]) {
      if (
        Object.prototype.hasOwnProperty.call(this.payload[PreferencesSwipesModules.PreferredType.EXPLICIT], key) &&
        this.payload[PreferencesSwipesModules.PreferredType.EXPLICIT][key]
      ) {
        payload[key] = this.payload[PreferencesSwipesModules.PreferredType.EXPLICIT][key] || null;
      }
    }
    payload.preferredType = this.payload.preferredType;

    this.userRegistrationService
      .routeToNextPage({ datingPreferences: payload }, 'accountSetup', false)
      .pipe(
        startWith(true),
        tap(() => {
          this.savingData = true;
        }),
        finalize(() => {
          this.savingData = false;
        }),
      )
      .subscribe();
  }

  public onCancel(): void {
    this.userRegistrationService.routeBackinRegistrationFlow();
  }

  private initRadialProgress(val: number): void {
    const total = 440;

    const offset1 = 175;
    const el1 = document.getElementById('bar1');
    el1.style.strokeDashoffset = offset1 + '';

    const offset2 = total - (total * ((val / 100) * 60)) / 100;
    const el2 = document.getElementById('bar2');
    el2.style.strokeDashoffset = offset2 + '';
  }

  updateModalAgeHeight() {
    this.ageRange = {
      lower: this.payload.explicit.age.min?.valueOf() || PreferencesSwipesModules.AgeAndHeight.defaultAgeRange.min,
      upper: this.payload.explicit.age.max?.valueOf() || PreferencesSwipesModules.AgeAndHeight.defaultAgeRange.max,
    };
    this.heightRange = {
      lower: this.payload.explicit.height.min?.valueOf() || PreferencesSwipesModules.AgeAndHeight.defaultHeightRange.min,
      upper: this.payload.explicit.height.max?.valueOf() || PreferencesSwipesModules.AgeAndHeight.defaultHeightRange.max,
    };
  }

  updateModalFaceEthnicity() {
    if (this.ethnicities?.length > 0) {
      for (const f of this.ethnicities) {
        f.selected = false;
      }
    }

    this.setFaceValue(this.payload.explicit.face);

    if (this.payload?.explicit?.ethnicity?.length > 0) {
      for (const e of this.payload.explicit.ethnicity) {
        for (const f of this.ethnicities) {
          if (e === f.name) {
            f.selected = true;
            break;
          }
        }
      }
    }
  }

  private showImplicitEditModal() {
    this.editImplicit = true;
  }

  /**
   * Updates the modal for the Racks and Asses
   */
  updateModalRackAss() {
    for (const f of this.racks) {
      f.selected = false;
    }
    for (const f of this.asses) {
      f.selected = false;
    }
    if (this.payload.explicit?.rack?.length > 0) {
      for (const e of this.payload.explicit.rack) {
        for (const f of this.racks) {
          if (e === f.name) {
            f.selected = true;
            break;
          }
        }
      }
    }
    if (this.payload.explicit?.ass?.length > 0) {
      for (const e of this.payload.explicit.ass) {
        for (const f of this.asses) {
          if (e === f.name) {
            f.selected = true;
            break;
          }
        }
      }
    }
  }

  showExplicitEditModal() {
    this.editExplicit = true;
    this.updateModalAgeHeight();
    this.updateModalFaceEthnicity();
    this.updateModalRackAss();

    setTimeout(() => {
      const faceRangeElement = document.getElementById('faceRangeElement');
      if (faceRangeElement && faceRangeElement?.shadowRoot) {
        const elem: HTMLElement = faceRangeElement.shadowRoot.querySelector('.range-knob-max');
        elem.style.display = 'none';
      }
    }, 500);
  }

  hideExplicitEditModal() {
    this.editExplicit = false;
  }

  modalClicked(event: any) {
    event.stopPropagation();
  }

  btnClicked(type: string, i: number) {
    if (type === 'ethnicities') {
      this.ethnicities[i].selected = !this.ethnicities[i].selected;
    } else if (type === 'rack') {
      this.racks[i].selected = !this.racks[i].selected;
    } else if (type === 'ass') {
      this.asses[i].selected = !this.asses[i].selected;
    }
  }

  hideImplicitEditModal() {
    this.editImplicit = false;
  }

  public faceRangeFormatter(value: Number): string {
    return `${value}+`;
  }

  async saveExplicitData() {
    let tempvalue: any = {};

    if (this.currentModule === PreferencesSwipesModules.AgeAndHeight.name) {
      tempvalue = {
        age: { min: this.ageRange.lower, max: this.ageRange.upper },
        height: { min: this.heightRange.lower, max: this.heightRange.upper },
      };
      this.payload.explicit.age = tempvalue.age;
      this.payload.explicit.height = tempvalue.height;

      this.payload.combined.age = {
        min: Operations.averageTwoNum(this.payload.implicit.age.min, this.payload.explicit.age.min),
        max: Operations.averageTwoNum(this.payload.implicit.age.max, this.payload.explicit.age.max),
      };

      this.payload.combined.height = {
        min: Operations.averageTwoNum(this.payload.implicit.height.min, this.payload.explicit.height.min),
        max: Operations.averageTwoNum(this.payload.implicit.height.max, this.payload.explicit.height.max),
      };
      this.ageHeightService.setData(this.payload);
    } else if (this.currentModule === PreferencesSwipesModules.FaceAndEthnicity.name) {
      const ethncities = this.ethnicities
        .filter((e) => {
          if (e.selected) return e;
        })
        .map((e) => e.name);

      tempvalue = { ethncities };

      this.payload.explicit.face = this.faceValue;
      this.payload.explicit.ethnicity = tempvalue.ethncities;
      this.payload.combined.face = parseInt(String(Operations.averageTwoNum(this.payload.implicit.face, this.payload.explicit.face)));
      this.payload.combined.ethnicity = Operations.firstThreeKeys(
        Operations.sortByKeyPairDesc(Operations.unique([...(this.payload.implicit.ethnicity || []), ...(this.payload.explicit.ethnicity || [])])),
      );

      this.faceEthnicityService.setData(this.payload);
    } else if (this.currentModule === PreferencesSwipesModules.RackAndAss.name) {
      const racks =
        this.racks.length > 0
          ? this.racks
              .filter((e) => {
                if (e.selected) return e;
              })
              .map((e) => e.name)
          : [];

      const asses =
        this.asses.length > 0
          ? this.asses
              .filter((e) => {
                if (e.selected) return e;
              })
              .map((e) => e.name)
          : [];

      tempvalue = { racks, asses };
      this.payload.explicit.rack = tempvalue.racks;
      this.payload.explicit.ass = tempvalue.asses;
      this.payload.combined.rack = Operations.firstThreeKeys(
        Operations.sortByKeyPairDesc(Operations.unique([...(this.payload?.implicit?.rack || []), ...(this.payload?.explicit?.rack || [])])),
      );
      this.payload.combined.ass = Operations.firstThreeKeys(
        Operations.sortByKeyPairDesc(Operations.unique([...(this.payload?.implicit?.ass || []), ...(this.payload?.explicit?.ass || [])])),
      );
      this.rackAssService.setData(this.payload);
    }

    this.hideExplicitEditModal();
  }

  public resetLikesDislikes(state: boolean = false): void {
    const likesDislikes = state ? { likes: [], disLikes: [], numberOfProfilesSwiped: 0 } : {};
    this.userRegistrationService
      .routeToNextPage(likesDislikes, 'swipe')
      .pipe(
        startWith(true),
        tap(() => {
          this.userRegistrationService.resetRequestedFromPrefSwipesPage = state;
          this.loadingProgressBar = true;
          this.changeDetectorRef.detectChanges();
        }),
        finalize(() => {
          this.hideImplicitEditModal();
          this.loadingProgressBar = false;
        }),
      )
      .subscribe();
  }
}
