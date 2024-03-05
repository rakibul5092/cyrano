import { Component, OnInit } from '@angular/core';
import { UserRegistrationRoute } from '../enums/user-registration-route.enum';
import { HeaderService } from '../layout/header/header.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-phone-signup',
  templateUrl: './phone-signup.component.html',
  styleUrls: ['./phone-signup.component.scss'],
})
export class PhoneSignupComponent implements OnInit {
  public progress = 0;
  public phoneNumber: string;
  public nextPath = UserRegistrationRoute['verify'];

  constructor(private headerService: HeaderService, private userRegistrationService: UserRegistrationService) {}

  ngOnInit(): void {
    this.phoneNumber = this.userRegistrationService.unmatched?.phoneNumber ?? null;
  }

  ionViewDidEnter(): void {
    this.headerService.headerProgress$.next(this.progress);
  }
}
