import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';

@Component({
  selector: 'app-referral-code',
  templateUrl: './referral-code.component.html',
  styleUrls: ['./referral-code.component.scss'],
})
export class ReferralCodeComponent implements OnInit {
  public referralForm: FormGroup;
  private headerProgress = 30.8;

  constructor(private fb: FormBuilder, private headerService: HeaderService, private nav: NavController) {}

  /***/
  ngOnInit(): void {
    this.buildForm();
  }

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(this.headerProgress);
  }

  /**
   * On confirm verification code
   */
  public confirm(): void {
    this.nav.navigateForward('/guru-registration/welcome', { animated: true, animationDirection: 'forward' });
  }

  /**
   * Building form
   */
  private buildForm(): void {
    this.referralForm = this.fb.group({
      referralCode: new UntypedFormControl(''),
    });
  }
}
