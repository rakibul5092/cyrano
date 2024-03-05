import { Component } from '@angular/core';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';

@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.scss'],
})
export class PhoneVerifyComponent {
  private headerProgress = 15.4;

  constructor(private headerService: HeaderService) {}

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(this.headerProgress);
  }
}
