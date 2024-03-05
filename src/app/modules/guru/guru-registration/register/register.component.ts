import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';

type RegisterForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup<RegisterForm>;
  public passwordVisibility = false;
  public confirmPasswordVisibility = false;

  constructor(private fb: FormBuilder, private navController: NavController, private headerService: HeaderService) {}

  get form(): FormGroup<RegisterForm> {
    return this.registerForm;
  }

  /**
   * Initialize variables and objects
   */
  ngOnInit(): void {
    this.buildForm();
  }

  ionViewWillEnter(): void {
    this.headerService.showHeader$.next(false);
    this.headerService.headerProgress$.next(0);
  }

  ionViewDidLeave(): void {
    this.headerService.showHeader$.next(true);
  }
  /**
   * Navigate to phone registration
   */
  public navigateToPhone(): void {
    if (this.registerForm.valid) {
      this.navController.navigateForward('/guru-registration/phone', { animated: true, animationDirection: 'forward' });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  public navigateToLogin(): void {
    this.navController.navigateRoot('/auth', { animationDirection: 'back', animated: true });
  }

  public changePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }
  public changeConfirmPasswordVisibility(): void {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }

  /**
   * build register form group
   */
  private buildForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
}
