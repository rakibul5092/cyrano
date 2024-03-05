import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuruHeaderService } from '../guru-header/guru-header.service';

@Component({
  selector: 'app-meta-information',
  templateUrl: './meta-information.component.html',
  styleUrls: ['./meta-information.component.scss'],
})
export class MetaInformationComponent implements OnInit {
  public metaForm: FormGroup;
  constructor(private guruHeaderService: GuruHeaderService, private fb: FormBuilder) {}

  /**
   * Initialize
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Hide or remove or destroy in this scope
   */
  ionViewDidEnter() {
    this.guruHeaderService.setNotificationsVisible(false);
    this.guruHeaderService.setTitle({ title: 'META_INFORMATION' });
  }

  /**
   * Build forms
   */
  public buildForm(): void {
    this.metaForm = this.fb.group({
      legalName: ['', Validators.required],
      occupation: ['', Validators.required],
      availableTime: ['', Validators.required],
      describePartner: ['', Validators.required],
      termsAndConditions: [false, Validators.requiredTrue],
    });
  }
}
