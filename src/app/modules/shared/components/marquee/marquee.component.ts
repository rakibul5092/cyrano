import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss'],
})
export class MarqueeComponent implements AfterContentInit {
  @Input() title: string = 'marquee';
  @ViewChild('titleContent', { static: false }) titleContent: ElementRef;

  private marqueeContentReferenceWidth = 200;
  private marqueeContentReferenceDuration = 20;

  /**
   * Component after init hook,
   * resize event listener
   */
  ngAfterContentInit(): void {
    document.fonts.ready.then(() => {
      setTimeout(this.checkFirstMarqueRender.bind(this), 0);
      window.addEventListener('resize', this.toggleMarque.bind(this));
    });
  }

  /**
   * Toggle dropdown menu
   */
  public toggleMarque(): boolean {
    // When no user is logged in, skip this process
    if (!this.titleContent) {
      return;
    }

    const titleContent = this.titleContent.nativeElement;
    const contentWidth = titleContent.clientWidth;
    const wrapperWidth = titleContent.parentNode.clientWidth;

    titleContent.style.setProperty('--marque-wrapper-width', `${wrapperWidth}px`);
    if (contentWidth > wrapperWidth) {
      titleContent.classList.add('marque');
    } else {
      titleContent.classList.remove('marque');
    }
    if (contentWidth && wrapperWidth) {
      const animationDuration = (contentWidth / this.marqueeContentReferenceWidth) * this.marqueeContentReferenceDuration;
      titleContent.style.animationDuration = animationDuration + 's';
      titleContent.style.animationDelay = '-' + animationDuration / 2 + 's';
    }

    return contentWidth && wrapperWidth;
  }

  /**
   * Check for first marque render, if not then render
   */
  public checkFirstMarqueRender(): void {
    if (!this.toggleMarque()) {
      setTimeout(this.checkFirstMarqueRender.bind(this), 5);
    }
  }
}
