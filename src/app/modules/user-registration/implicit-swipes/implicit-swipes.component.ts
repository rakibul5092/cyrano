import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopupModalService } from 'nextsapien-component-lib';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { SwipeTypes } from '../enums/swipes.enum';
import { HeaderService } from '../layout/header/header.service';
import { DummyProfile } from '../models/dummy_profile.model';
import { Unmatched } from '../models/unmatched.model';
import { UserRegistrationService } from '../services/user-registration.service';
@Component({
  selector: 'app-implicit-swipes',
  templateUrl: './implicit-swipes.component.html',
  styleUrls: ['./implicit-swipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImplicitSwipesComponent implements OnInit, OnDestroy {
  public swipableIndex: number = 0;
  public greetingModalVisibility = false;
  public unmatchedInfo: Unmatched;
  public lastIndexReached = false;
  public profileDetails: DummyProfile[] = [];
  public icons = this.commonutilService.icons;
  public profiles$: Subject<DummyProfile[]> = new Subject();
  public swipeOnClickSubject: Subject<{ direction: string; index: number }> = new Subject();

  private componentDestroyed$: Subject<void> = new Subject();
  public skipLoadingSpinner: boolean = false;
  isActive: boolean = true;
  firstCardSwipableIndex: number = 0;
  secondCardSwipableIndex: number = 0;
  private subscriptions: Subscription[] = [];

  /**
   * @param headerService
   * @param modalCtrl
   */
  constructor(
    private headerService: HeaderService,
    private modalCtrl: ModalController,
    private cdr: ChangeDetectorRef,
    private userRegistrationService: UserRegistrationService,
    public commonutilService: CommonUtilService,
    public modalFactoryService: PopupModalService,
    public router: Router,
    private fb: FormBuilder,
  ) {}

  /**
   * Initialize data
   */
  ngOnInit(): void {
    this.userRegistrationService.getMatchingProfiles().subscribe((profileDetails) => {
      this.profileDetails = profileDetails;
      this.updateProfileDetails();
      this.cdr.detectChanges();
    });
    this.headerService.handleBackBtnClick.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
      if (this.swipableIndex === 0 || !this.isActive) {
        this.userRegistrationService.routeBackinRegistrationFlow();
      } else {
        this.swipableIndex--;
        this.unmatchedInfo.numberOfProfilesSwiped = this.swipableIndex - 1;
        this.userRegistrationService.updateLocalEntity(this.unmatchedInfo);
        this.updateIndexes();
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  ionViewWillEnter(): void {
    this.unmatchedInfo = this.userRegistrationService.unmatched;
    if (this.unmatchedInfo?.numberOfProfilesSwiped > 0) {
      this.swipableIndex = this.unmatchedInfo?.numberOfProfilesSwiped + 1;
    } else if (this.unmatchedInfo?.numberOfProfilesSwiped == 0) {
      this.swipableIndex = 1;
    } else {
      setTimeout(() => {
        const obj = {
          icon: this.icons.info,
          confirmButton: 'UNMATCHED_USER.CONTINUE',
          title: 'UNMATCHED_USER.WHY_AM_I_SWIPING',
          message: 'UNMATCHED_USER.SWIPE_MESSAGE',
        };
        const ref = this.modalFactoryService.getInstance();
        this.modalFactoryService.setValues(obj);
        this.subscriptions.push(ref.instance.modalConfirm.subscribe(() => this.onOk()));
        this.modalFactoryService.show();
        ref.changeDetectorRef.detectChanges();
        this.cdr.detectChanges();
      }, 500);
    }
    this.isActive = true;
    this.updateProfileDetails();

    this.updateIndexes();
    this.headerService.headerProgress$.next(93.75);
  }

  async ionViewWillLeave(): Promise<void> {
    this.swipableIndex = 0;
    this.lastIndexReached = false;
    this.isActive = false;
    this.headerService.showHeader$.next(true);
    const popover = await this.modalCtrl.getTop();
    if (popover) await popover.dismiss(null);
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  /**
   * On dislike profile
   */
  public onDislike(): void {
    this.swipeOnClickSubject.next({ direction: SwipeTypes.swipeLeft, index: this.swipableIndex });
  }

  /**
   * On like profile
   */
  public onLike(): void {
    this.swipeOnClickSubject.next({ direction: SwipeTypes.swipeRight, index: this.swipableIndex });
  }

  /**
   * @param event
   */
  public onSwiped(event: { profile: DummyProfile; liked: boolean }, firstCardSwiped: boolean): void {
    if (this.profileDetails.length - 1 > this.swipableIndex) {
      if (this.swipableIndex < this.unmatchedInfo?.numberOfProfilesSwiped) {
        let alreadySwipedProfileIndex = this.unmatchedInfo?.likes?.findIndex((likedProfile) => likedProfile === event?.profile?._id);
        if (alreadySwipedProfileIndex >= 0) {
          this.unmatchedInfo?.likes?.splice(alreadySwipedProfileIndex, 1);
        } else {
          alreadySwipedProfileIndex = this.unmatchedInfo?.disLikes?.findIndex((dislikedProfile) => dislikedProfile === event?.profile?._id);
          this.unmatchedInfo?.disLikes?.splice(alreadySwipedProfileIndex, 1);
        }
      }

      this.unmatchedInfo.numberOfProfilesSwiped = this.swipableIndex;

      if (this.swipableIndex === 0) {
        this.unmatchedInfo.likes = [];
        this.unmatchedInfo.disLikes = [];
      }

      if (event.liked === true) {
        this.unmatchedInfo.likes.push(event?.profile?._id);
      } else {
        this.unmatchedInfo.disLikes.push(event?.profile?._id);
      }

      this.userRegistrationService.updateLocalEntity(this.unmatchedInfo);
      this.swipableIndex += 1;
    } else {
      this.lastIndexReached = true;
      this.onSkip();
    }
    this.updateIndexes(firstCardSwiped);
    this.cdr.detectChanges();
  }

  /**
   * Dismiss greetings modal
   */
  public onOk(): void {
    this.modalCtrl.dismiss();
  }

  public openSkipModal(): void {
    const obj = {
      icon: this.icons.info,
      confirmButton: 'UNMATCHED_USER.SKIP_ANYWAY',
      cancelButton: 'UNMATCHED_USER.CANCEL',
      title: 'UNMATCHED_USER.SKIP_SWIPES',
      message: 'UNMATCHED_USER.SKIP_MESSAGE',
      checkboxText: 'UNMATCHED_USER.I_AGREE',
    };
    const ref = this.modalFactoryService.getInstance();
    this.modalFactoryService.setValues(obj);
    this.subscriptions.push(ref.instance.modalConfirm.subscribe(() => this.onSkip()));
    this.subscriptions.push(ref.instance.modalDismiss.subscribe(() => this.handleSkipModalDismiss()));
    this.modalFactoryService.show();
    ref.changeDetectorRef.detectChanges();
  }

  /**
   * On skip clicked
   */
  public onSkip(): void {
    this.modalFactoryService.hide();
    this.userRegistrationService.routeToNextPage({ initiatedSummarySection: true }, 'congratulations').subscribe();
  }

  public handleSwipeCardSkip(): void {
    if (this.unmatchedInfo.initiatedSummarySection) {
      this.onSkip();
    } else {
      const obj = {
        icon: this.icons.info,
        confirmButton: 'UNMATCHED_USER.SKIP_ANYWAY',
        cancelButton: 'UNMATCHED_USER.CANCEL',
        title: 'UNMATCHED_USER.SKIP_SWIPES',
        message: 'UNMATCHED_USER.SKIP_MESSAGE',
        checkboxText: 'UNMATCHED_USER.I_AGREE',
      };
      const ref = this.modalFactoryService.getInstance();
      this.modalFactoryService.setValues(obj);
      this.subscriptions.push(ref.instance.modalConfirm.subscribe(() => this.onSkip()));
      this.subscriptions.push(ref.instance.modalDismiss.subscribe(() => this.handleSkipModalDismiss()));
      this.modalFactoryService.show();
    }
  }

  public handleSkipModalDismiss(): void {
    this.modalFactoryService.hide();
  }

  private updateProfileDetails() {
    this.profiles$.next(this.profileDetails);
  }

  private updateIndexes(firstCardSwiped?: boolean) {
    if (firstCardSwiped) {
      this.firstCardSwipableIndex = this.swipableIndex + 1;
    } else if (firstCardSwiped === undefined) {
      this.firstCardSwipableIndex = this.swipableIndex;
      this.secondCardSwipableIndex = this.swipableIndex + 1;
    } else {
      this.secondCardSwipableIndex = this.swipableIndex + 1;
    }
    this.cdr.detectChanges();
  }
}
