import { Component, OnInit } from '@angular/core';
import { UserRegistrationRoute } from '../enums/user-registration-route.enum';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent implements OnInit {
  private progress = 6.25;
  public nextPath = UserRegistrationRoute['location'];
  public defaultValue: string = '';
  public phoneNumber: string = '';

  /**
   * @param headerService
   * @param userRegistrationService
   */
  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService) {}

  ngOnInit(): void {
    if (this.userRegistrationService.unmatched?.phoneNumber) {
      this.defaultValue = this.userRegistrationService.unmatched?.otp.code;
      this.phoneNumber = this.userRegistrationService.unmatched?.phoneNumber;
    }
  }

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(this.progress);
  }
}
