import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent {
  public form: FormGroup;

  /** */
  constructor(public fb: FormBuilder, @Optional() @Inject(MAT_DIALOG_DATA) public data, private _dialogRef: MatDialogRef<PaymentMethodComponent>) {
    this.form = this.createForm();
    this.form.patchValue(this.data);
  }

  /** */
  public confirm(): void {
    if (this.form.valid) {
      this._dialogRef.close(this.form.getRawValue());
    }
  }

  public close(): void {
    this._dialogRef.close(undefined);
  }

  public handleUpdateCardType(cardType: string): void {
    if (cardType?.length) {
      this.form.patchValue({
        type: cardType,
      });
    }
  }

  /** */
  private createForm(): FormGroup {
    return this.fb.group({
      owner: this.fb.group({
        firstName: [''],
        lastName: [''],
      }) as FormGroup,
      cardNumber: ['', [Validators.required]],
      expiry: [{ month: '', year: '' }, [Validators.required]],
      cvc: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }
}
