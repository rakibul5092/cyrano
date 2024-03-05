import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { SwiperComponent } from 'swiper/angular';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent {
  @ViewChild('swiper') swiper: SwiperComponent;

  activeIndex: number = 0;
  backgroundFloatingImageUrl: string = '../../../../assets/images/vector-1.svg';

  /***/
  constructor(public commonUtilService: CommonUtilService, public cdRef: ChangeDetectorRef) {}

  /**
   * Slide to next page
   */
  nextSlide(): void {
    this.swiper.swiperRef.slideNext();
  }

  /**
   * Slide to prev page
   */
  prevSlide(): void {
    this.swiper.swiperRef.slidePrev();
  }

  /**
   * Update current active slide index for button view logic
   *
   * @param swiper
   */
  onActiveIndexChange([swiper]: [swiper: Swiper]): void {
    this.activeIndex = swiper.activeIndex;

    // Get background-float image based on active slide index
    switch (this.activeIndex) {
      case 1:
        this.backgroundFloatingImageUrl = '../../../../assets/images/vector-2.svg';
        break;
      case 2:
        this.backgroundFloatingImageUrl = '../../../../assets/images/vector-3.svg';
        break;
      default:
        this.backgroundFloatingImageUrl = '../../../../assets/images/vector-1.svg';
    }

    // Update View
    this.cdRef.detectChanges();
  }
}
