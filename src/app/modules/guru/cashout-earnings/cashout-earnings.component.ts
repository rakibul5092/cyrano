import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-cashout-earnings',
  templateUrl: './cashout-earnings.component.html',
  styleUrls: ['./cashout-earnings.component.scss'],
})
export class CashoutEarningsComponent implements OnInit, OnDestroy {
  public statistics: any[] = [
    { type: 'GURU.EARNINGS', url: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png', value: 240, unit: '$', maxValue: 500 },
    { type: 'GURU.CLIENTS', value: 36, unit: '', maxValue: 100 },
    { type: 'GURU.CLIENTS', value: 36, unit: '', maxValue: 100 },
  ];

  public totalAmount = 500;
  public selectedAmount = 0;
  private headerTitle: string = 'CASHOUT_EARNINGS';

  /**
   * @param menu
   * @param guruHeaderService
   */
  constructor(private menu: MenuController, private guruHeaderService: GuruHeaderService) {}

  /**
   * Initializing header title
   */
  ionViewWillEnter(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }

  /**
   * enabled menu swipe gesture when destory this component
   */
  ngOnDestroy(): void {
    this.menu.swipeGesture(true);
  }

  /**
   * Initialize state
   */
  ngOnInit(): void {
    this.menu.swipeGesture(false);
  }

  /**
   *
   * @param event
   */
  public onAmountChange(event: any): void {
    this.selectedAmount = event;
  }
}
