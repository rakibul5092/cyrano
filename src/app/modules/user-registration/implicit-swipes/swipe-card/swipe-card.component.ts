import { animate, keyframes, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Gesture, GestureConfig, GestureController, GestureDetail } from '@ionic/angular';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { SwipeTypes } from '../../enums/swipes.enum';
import { DummyProfile } from '../../models/dummy_profile.model';
import * as kf from './keyframes';
@Component({
  selector: 'app-swipe-card',
  templateUrl: './swipe-card.component.html',
  styleUrls: ['./swipe-card.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => ' + SwipeTypes.swipeRight, animate(700, keyframes(kf.swiperight))),
      transition('* => ' + SwipeTypes.swipeLeft, animate(700, keyframes(kf.swipeleft))),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipeCardComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('card') cardElement: ElementRef<HTMLDivElement>;
  @Input() profile: DummyProfile;
  @Input() swipeOnClickSubject: Subject<{ direction: string; index: number }>;

  @Output() swiped: EventEmitter<{ profile: DummyProfile; liked: boolean }> = new EventEmitter();

  public selectedPhotoIndex: number = 0;
  public animationState: string;
  public icons = this.commonUtilService.icons;

  private gestureX: Gesture;
  private gestureY: Gesture;
  private style: CSSStyleDeclaration;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(private gestureCtrl: GestureController, private commonUtilService: CommonUtilService, private cdr: ChangeDetectorRef) {}

  /***/
  ngOnInit(): void {
    this.swipeOnClickSubject.pipe(distinctUntilChanged(), takeUntil(this.componentDestroyed$)).subscribe((res) => {
      if (res.index === this.profile?.index && this.style && !this.animationState) {
        this.animationState = res.direction;
        this.onEnd(res.direction, this.style, window.innerWidth, false);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile.currentValue?.index !== changes.profile.previousValue?.index) {
      if (this.style) {
        this.style.transition = '';
        this.style.transform = '';
      }

      this.cdr.detectChanges();
      this.initGesture();
    }
  }

  /**
   * Destroy gesture objects
   */
  ngOnDestroy(): void {
    this.gestureX.destroy();
    this.gestureY.destroy();
    window.ondragstart = (): boolean => false;
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  /**
   */
  public resetAnimationState(): void {
    this.animationState = '';
  }

  /**
   * Switching photos of a preference
   *
   * @param event
   */
  public switchImage(event): void {
    if (event.x < screen.width / 2 && this.selectedPhotoIndex > 0) {
      this.selectedPhotoIndex--;
    } else if (event.x > screen.width / 2 && this.selectedPhotoIndex < this.profile.images?.length - 1) {
      this.selectedPhotoIndex++;
    }
  }

  /**
   * Initialization of gesture
   */
  private async initGesture(): Promise<void> {
    this.style = this.cardElement.nativeElement.style;

    const windowWidth = window.innerWidth;
    window.ondragstart = (): boolean => false;
    const options1: GestureConfig = {
      el: this.cardElement.nativeElement,
      gestureName: 'profile-swiperX',
      direction: 'x',
      disableScroll: true,
      gesturePriority: 1,
      onStart: () => {
        this.style.transition = 'none';
      },
      onMove: (event) => this.onMove(event, this.style),
      onEnd: (event) => {
        const direction = event.deltaX > windowWidth / 4 ? SwipeTypes.swipeRight : event.deltaX < -windowWidth / 4 ? SwipeTypes.swipeLeft : '';
        this.onEnd(direction, this.style, windowWidth);
      },
    };
    const options2: GestureConfig = {
      el: this.cardElement.nativeElement,
      gestureName: 'profile-swiperY',
      direction: 'y',
      disableScroll: true,
      gesturePriority: 0,
      onStart: () => {
        this.style.transition = 'none';
      },
      onMove: (event) => this.onMove(event, this.style),
      onEnd: (event) => {
        const direction = event.deltaX > windowWidth / 4 ? SwipeTypes.swipeRight : event.deltaX < -windowWidth / 4 ? SwipeTypes.swipeLeft : '';
        this.onEnd(direction, this.style, windowWidth);
      },
    };

    this.gestureX = this.gestureCtrl.create(options1);
    this.gestureY = this.gestureCtrl.create(options2);
    this.gestureX.enable(true);
    this.gestureY.enable(true);
  }

  /**
   * @param event
   * @param style
   */
  private onMove(event: GestureDetail, style: CSSStyleDeclaration): void {
    if (event.deltaX > 0) {
      style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(-${event.deltaX / 10}deg) `;
    } else {
      style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${(-1 * event.deltaX) / 10}deg) `;
    }
    style.boxShadow = '-3px -3px 16px rgba(255, 255, 255, 0.1), 5px 5px 16px rgba(0, 0, 0, 0.32)';
  }

  /**
   * @param direction
   * @param style
   * @param windowWidth
   */
  private onEnd(direction: string, style: CSSStyleDeclaration, windowWidth: number, dragAction = true): void {
    style.transition = '0.3s ease-out';
    if (!direction || direction == '') {
      this.style.transition = '';
      this.style.transform = '';
    } else if (dragAction) {
      this.updateCardStyles(direction, style, windowWidth);
    } else {
      setTimeout(() => {
        this.updateCardStyles(direction, style, windowWidth);
      }, 500);
    }
  }

  private updateCardStyles(direction: string, style: CSSStyleDeclaration, windowWidth: number): void {
    if (direction === SwipeTypes.swipeRight) {
      style.transform = `translateX(${windowWidth * 2}px)`;
      this.swiped.emit({ profile: this.profile, liked: true });
    } else if (direction === SwipeTypes.swipeLeft) {
      style.transform = `translateX(-${windowWidth * 2}px)`;
      this.swiped.emit({ profile: this.profile, liked: false });
    }
    this.animationState = null;
  }
}
