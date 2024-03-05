import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
})
export class UsernameComponent implements OnInit {
  public recommends = ['abid786', 'abidiqbal12', 'abid113'];
  public usernameForm: FormGroup;
  private headerProgress = 23.1;

  constructor(private fb: FormBuilder, private navController: NavController, private headerService: HeaderService) {}

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
    this.navController.navigateForward('/guru-registration/referral-code', { animated: true, animationDirection: 'forward' });
  }

  /**
   * Building form
   */
  private buildForm(): void {
    this.usernameForm = this.fb.group({
      username: new UntypedFormControl('', [Validators.required]),
    });
  }
}
