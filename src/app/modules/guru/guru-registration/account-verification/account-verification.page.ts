import { Component } from '@angular/core';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';
import { MediaCaptureService } from './capture-media/media-capture.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.page.html',
  styleUrls: ['./account-verification.page.scss'],
})
export class AccountVerificationPage {
  constructor(public mediaCaptureService: MediaCaptureService, private headerService: HeaderService) {}

  ionViewWillEnter() {
    this.headerService.headerProgress$.next(50);
  }

  get isCapturedAllDocs(): boolean {
    return this.mediaCaptureService.drivingLicense.back && this.mediaCaptureService.drivingLicense.front ? true : false;
  }
}
