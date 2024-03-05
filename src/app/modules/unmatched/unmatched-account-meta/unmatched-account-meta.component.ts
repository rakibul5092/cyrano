import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUtilService } from '../../../services/common-utils.service';

@Component({
  selector: 'app-unmatched-account-meta',
  templateUrl: './unmatched-account-meta.component.html',
  styleUrls: ['./unmatched-account-meta.component.scss'],
})
export class UnmatchedAccountMetaComponent implements OnInit {
  public loading: boolean;
  public formGroup: UntypedFormGroup;

  /***/
  constructor(private fb: UntypedFormBuilder, public commonUtilService: CommonUtilService) {}

  /**
   * Initialize comp hook
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * on submit account
   */
  public onSubmit(): void {
    if (this.formGroup.valid && !this.loading) {
      this.loading = true;
      // TO-DO
    }
  }

  /**
   * build account form
   */
  private buildForm(): void {
    this.formGroup = this.fb.group({
      phone: new UntypedFormControl('', [Validators.required, Validators.email]),
      schedule: new UntypedFormControl('', [Validators.required]),
      idealPartnerDescription: new UntypedFormControl('', [Validators.required]),
    });
  }
}
