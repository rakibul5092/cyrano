import { Component } from '@angular/core';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';

@Component({
  selector: 'app-phone-register',
  templateUrl: './phone-register.component.html',
  styleUrls: ['./phone-register.component.scss'],
})
export class PhoneRegisterComponent {
  public headerProgress = 7.7;

  constructor(private headerService: HeaderService) {}

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(this.headerProgress);
  }
}
