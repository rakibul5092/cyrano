import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HeaderTitle } from 'src/app/models/header-title.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { ActivityLogComponent } from '../activity-log/activity-log.component';
import { GuruHeaderService } from './guru-header.service';

@Component({
  selector: 'app-guru-header',
  templateUrl: './guru-header.component.html',
  styleUrls: ['./guru-header.component.scss'],
})
export class GuruHeaderComponent implements OnInit, OnDestroy {
  @Input() isModal = false;
  public titleObject: HeaderTitle;
  public notifications$: Observable<number>;
  public notificationsVisible$: Observable<boolean>;
  private unsubscribeAll: Subject<void> = new Subject();
  private activityModal: HTMLIonModalElement;

  /**
   *
   * @param commonUtilService
   * @param guruHeaderService
   * @param nav
   * @param modalCtrl
   */
  constructor(public commonUtilService: CommonUtilService, private guruHeaderService: GuruHeaderService, public nav: NavController, private modalCtrl: ModalController) {}

  /***/
  ngOnInit(): void {
    this.notifications$ = this.guruHeaderService.watchNotifications();
    this.notificationsVisible$ = this.guruHeaderService.watchNotificationsVisible();
    this.guruHeaderService
      .watchTitle()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.titleObject = res;
      });
  }

  /***/
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.unsubscribe();
  }

  /***/
  public onBack(): void {
    this.nav.back();
  }

  /**
   * Open Activity modal
   */
  public async onRightHeaderButton(): Promise<void> {
    const data = {};
    this.activityModal = await this.modalCtrl.create({
      component: ActivityLogComponent,
      componentProps: data,
      animated: true,
      backdropDismiss: true,
      mode: 'ios',
      keyboardClose: true,
      cssClass: 'activity-log',
    });
    await this.activityModal.present();
  }

  /**
   * On notification icon click
   */
  public onNotificationClick(): void {
    this.nav.navigateForward('/guru/notifications', { animated: true, animationDirection: 'forward' });
  }
}
