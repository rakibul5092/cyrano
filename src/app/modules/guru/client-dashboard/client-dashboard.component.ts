import { Component, OnInit } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements OnInit {
  public segments: string[] = ['CONTEXT', 'EVENTS', 'SCHEDULES', 'BASIC_INFO', 'PARTICULARS', 'ORDERS'];

  public selectedSegment = 'SCHEDULES';
  private color = '#3a2932';
  private progressValue = 70;
  private headerTitle: string = 'CLIENT_SCHEDULE';

  /**
   * @param commonUtilService
   * @param guruHeaderService
   * @param themeService
   */
  constructor(public commonUtilService: CommonUtilService, private guruHeaderService: GuruHeaderService, private themeService: ThemeService) {}

  /**
   * Initializing header title
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }

  /**
   * Setup icons change listener
   */
  ngOnInit(): void {
    // send button circular progress with custom styles
    this.initCircularSendButton();
  }

  /**
   * Segment tabs on change
   */
  public segmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
  }

  /**
   * Scroll fully not visible button when clicked
   *
   * @param index
   */
  public moveToSegment(index): void {
    const segment = document.querySelector('ion-segment');
    segment.value = index;
    const active = segment.querySelectorAll('ion-segment-button')[index];
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  /***/
  private initCircularSendButton(): void {
    this.themeService.themeChange.subscribe((res) => {
      this.color = res.key === 'dark' ? '#3a2932' : '#c5d6cd';
    });
    const progressBar = document.querySelector('.circular-progress') as HTMLDivElement;
    const progressEndValue = 100;
    const speed = 100;

    const progress = setInterval(() => {
      progressBar.style.background = `conic-gradient(
                #de547b ${this.progressValue * 3.6}deg,
                ${this.color} ${this.progressValue * 3.6}deg
            )`;
      if (this.progressValue === progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }
}
