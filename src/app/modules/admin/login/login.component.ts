import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loading = false;

  public loginFormGroup!: FormGroup;

  public hide = true;

  /**
   * @param fb
   * @param commonUtilService
   * @param themeService
   */
  constructor(private readonly fb: FormBuilder, public commonUtilService: CommonUtilService, private themeService: ThemeService) {}

  /***/
  ngOnDestroy(): void {
    this.themeService.showLayout.next(true);
  }

  /***/
  ngOnInit(): void {
    this.themeService.showLayout.next(false);
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /***/
  public gotoAdminDashboard(): void {
    this.commonUtilService.navigate('admin/dashboard');
  }
}
