import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavController } from '@ionic/angular';
import { APPLICATION_ERRORS } from 'src/app/lookups/error.codes.lookup';
import { Card } from 'src/app/models/card.model';
import { DatingPlatform } from 'src/app/modules/user-registration/models/dating-platforms';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { ExceptionsService } from 'src/app/services/exceptions.service';
import { Unmatched } from '../models/unmatched.model';
import { UserRegistrationService } from '../services/user-registration.service';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

interface PlatfromPaymentControl {
  platform: FormControl<string>;
  qty: FormControl<number>;
  price: FormControl<number>;
  unmutable: FormControl<boolean>;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPage implements OnInit {
  public datingPlatforms: DatingPlatform[] = [];
  public form: FormGroup<{
    platformPayments: FormArray<FormGroup<PlatfromPaymentControl>>;
    totalPayment: FormControl<number>;
  }>;
  public dialogRef: MatDialogRef<PaymentMethodComponent>;
  private unmatchedInfo: Unmatched;
  public cardDetails: Card;
  public icons: any = this.commonUtilService.icons;
  public totalPayment: number = 0;

  /**
   * @constructor represents paymentPage component
   */
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public navCtrl: NavController,
    private userRegistrationService: UserRegistrationService,
    private commonUtilService: CommonUtilService,
    private exceptionsService: ExceptionsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.unmatchedInfo = this.userRegistrationService.unmatched;
    this.cardDetails = this.unmatchedInfo.cardDetails;
    this.datingPlatforms = this.userRegistrationService.unmatched.datingPlatforms;

    this.form = this.fb.group({
      platformPayments: new FormArray([]),
      totalPayment: [],
    });

    for (const datingPlatform of this.datingPlatforms) {
      const fg = this.fb.group({
        platform: [datingPlatform.platform],
        qty: [{ value: 1, disabled: true }, Validators.min(0)],
        price: [datingPlatform.price],
        unmutable: [false],
      });
      this.platformPayments.push(fg);
    }

    // add phone number payment
    const datingAccountPhoneNumberDetails = this.userRegistrationService.unmatched.datingAccountPhoneNumberDetails;
    if (datingAccountPhoneNumberDetails?.phoneNumber && datingAccountPhoneNumberDetails?.pricePlan) {
      const phoneNumberGroup = this.fb.group({
        platform: ['Phone Number'],
        qty: [{ value: 1, disabled: true }, Validators.min(0)],
        price: [datingAccountPhoneNumberDetails.pricePlan],
        unmutable: [true],
      });
      this.platformPayments.push(phoneNumberGroup);
    }

    this.setTotalPayment();
    this.cdr.detectChanges();
  }

  /**
   * returns platformPayments as a form array
   */
  get platformPayments(): FormArray<FormGroup<PlatfromPaymentControl>> {
    return this.form.controls.platformPayments;
  }

  /**
   * @method increaseQty - increases the quantity count for an input
   * @param index number
   */
  public increaseQty(index: number): void {
    const platformControl = this.getPlatformControl(index);
    if (!platformControl?.unmutable?.value) {
      const qty = platformControl.qty;
      qty.setValue(qty.value + 1);
      this.setTotalPayment();
    }
  }

  /**
   * @method decreaseQty - Decreases quantity
   * @param index number
   */
  public decreaseQty(index: number): void {
    const platformControl = this.getPlatformControl(index);
    if (!platformControl?.unmutable?.value) {
      const qty = platformControl.qty;
      if (qty.value <= 0) {
        this.removePlatform(index);
        return;
      }
      qty.setValue(qty.value - 1);
      this.setTotalPayment();
    }
  }

  /**
   * @method checks if quantity for platform is less than or equal to one
   * @param index {number}
   * @returns boolean
   */
  public isQtyLessThan1(index: number): boolean {
    return (this.platformPayments.controls[index] as FormGroup).controls.qty.value <= 0;
  }

  /** */
  public getCardNumber(digits: string): string {
    return this.padLastFourDigits(digits).replace(/(\*{4})/g, '$& ');
  }

  /** */
  public async sendRequest(): Promise<any> {
    this.userRegistrationService.routeToNextPage({}, 'paymentSuccess').subscribe();
  }

  /** */
  public editPayment(): void {
    this.dialogRef = this.dialog.open(PaymentMethodComponent, {
      data: this.cardDetails,
      panelClass: 'mat-dialog-pane',
    });
    this.dialogRef.afterClosed().subscribe((cardDetails: Card) => {
      if (cardDetails) {
        this.userRegistrationService.update({ ...this.userRegistrationService.unmatched, cardDetails: cardDetails }).subscribe({
          next: (value: Unmatched) => {
            this.cardDetails = value.cardDetails;
            this.cdr.detectChanges();
          },
          error: (error) => {
            this.exceptionsService.handleExceptions(error, [APPLICATION_ERRORS.SERVER_ERROR]);
          },
        });
      }
    });
  }

  public onBack(): void {
    this.userRegistrationService.routeBackinRegistrationFlow();
  }

  /** */
  private removePlatform(index: number): void {
    this.platformPayments.removeAt(index);
  }

  /**
   * @method padLastFourDigits
   * @param fullString a string of numbers that is at list 4 digits long
   * @returns string
   */
  private padLastFourDigits(fullString: string): string {
    const last4 = fullString.slice(-4);
    return last4.padStart(fullString.length, '*');
  }

  /** */
  private setTotalPayment(): void {
    const totalValue = this.platformPayments.controls.reduce(
      (prevValue: number, currFormGroup: FormGroup) => prevValue + currFormGroup.controls.qty.value * currFormGroup.controls.price.value,
      0,
    );

    this.totalPayment = totalValue;
    this.form.get('totalPayment').setValue(totalValue);
  }

  private getPlatformControl(index: number): PlatfromPaymentControl {
    return this.platformPayments.controls[index].controls;
  }
}
