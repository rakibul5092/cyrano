import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Card } from 'src/app/models/card.model';
import { PaymentMethodComponent } from '../../../payment/payment-method/payment-method.component';
import { UserRegistrationService } from '../../../services/user-registration.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingComponent implements OnInit {
  public card: Card;
  public dialogRef: MatDialogRef<PaymentMethodComponent>;

  public phoneNumbers = ['(555) 555-1234', '(555) 555-5678'];
  public form: FormGroup;

  /** */
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private userRegistrationService: UserRegistrationService) {}

  ngOnInit(): void {
    this.buildForm();

    this.form.patchValue({
      phoneNumber: this.userRegistrationService.unmatched?.datingAccountPhoneNumberDetails?.phoneNumber,
      pricePlan: this.userRegistrationService.unmatched?.datingAccountPhoneNumberDetails?.pricePlan,
    });
  }

  public addCard(): void {
    this.dialogRef = this.dialog.open(PaymentMethodComponent, {
      data: this.card,
      panelClass: 'mat-dialog-pane',
    });
  }

  public onBack(): void {
    this.userRegistrationService.routeBackinRegistrationFlow();
  }

  public onNext(): void {
    this.userRegistrationService
      .routeToNextPage(
        {
          datingAccountPhoneNumberDetails: {
            ...this.userRegistrationService.unmatched?.datingAccountPhoneNumberDetails,
            phoneNumber: this.form.value.phoneNumber,
            pricePlan: this.form.value.pricePlan,
          },
        },
        'setupDatingAccount',
      )
      .subscribe();
  }

  /**
   * Building form
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      phoneNumber: [null, [Validators.required]],
      pricePlan: [null, [Validators.required]],
    });
  }
}
