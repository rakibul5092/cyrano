import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CardInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CardInputComponent,
    },
  ],
})
export class CardInputComponent implements OnInit, ControlValueAccessor, Validator {
  @ViewChild('inputElem') inputElem: ElementRef;

  @Input() placeholder: string = 'Card Number';
  @Output() updateCardType: EventEmitter<string> = new EventEmitter<string>();

  public cardType = '';
  public icons: any = this.commonUtilService.icons;
  public touched: boolean = false;
  public disabled: boolean = false;
  public value = '';

  private cardLength = 16;
  private amExpressMask = 'dddd dddddd ddddd';
  private mask4 = 'dddd dddd dddd dddd';
  private isDelete: boolean = false;

  private cardMask = this.mask4;

  private maskCharacters = new Map([
    ['d', true],
    ['D', true],
  ]);

  private caretPosition = 0;

  /** */
  constructor(private commonUtilService: CommonUtilService) {}

  /** */
  ngOnInit(): void {
    //  to make it asychronous and be able to get reference to the viewChild
    requestAnimationFrame(this.updateValue.bind(this));
  }

  /** */
  public onTouched(): any {}

  /** */
  public onChange(cardNumber: string): any {}

  /** */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** */
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** */
  public validate(control: AbstractControl): ValidationErrors | null {
    if (!this.isValidCardNumber(control.value)) {
      return { matchError: { valid: false, validation: 'Luhr' } };
    }
    return null;
  }

  /** */
  public markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  /** */
  public writeValue(cardNumber: string): void {
    cardNumber = cardNumber.replace(/\s/g, '');
    for (const digit of cardNumber) {
      if (/\d/.test(digit) !== true) {
        this.value = '';
        return;
      }
    }
    this.value = cardNumber;
  }

  /** */
  public keyDown(event: KeyboardEvent): void {
    const key = event.key;
    this.isDelete = false;
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      return;
    }

    if (event.ctrlKey && key.toLowerCase() === 'v') {
      return;
    }

    if (key === 'Backspace') {
      this.isDelete = true;
      return;
    }

    if (this.value.length >= this.cardLength || key === ' ') {
      event.preventDefault();
      return;
    }

    if (!/\d/.test(key)) {
      event.preventDefault();
      return;
    }
  }

  /** */
  public onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const caretPos = (event.target as HTMLInputElement).selectionStart;
    const data = event.clipboardData.getData('text');
    let value = '';
    for (const ch of data) {
      if (!/\d/.test(ch)) {
        continue;
      }
      value += ch;
    }
    this.value = this.value.substring(0, caretPos) + value + this.value.substring(caretPos);
    this.updateValue();
  }

  /** */
  public onInput(event: InputEvent | Event): void {
    this.markAsTouched();
    const inputElement = event.currentTarget as HTMLInputElement;
    this.caretPosition = inputElement.selectionStart;
    this.value = inputElement.value.replace(/\s/g, '');
    this.updateValue();
  }

  /** */
  public updateValue(): void {
    const inputElement = this.inputElem.nativeElement;
    if (this.isVisaCard(this.value)) {
      this.cardType = 'visa';
      this.cardMask = this.mask4;
      this.cardLength = 16;
    } else if (this.isMasterCard(this.value)) {
      this.cardType = 'mastercard';
      this.cardMask = this.mask4;
      this.cardLength = 16;
    } else if (this.isAmericanExpressCard(this.value)) {
      this.cardType = 'americanExpress';
      this.cardMask = this.amExpressMask;
      this.cardLength = 15;
    } else {
      this.cardType = '';
      this.cardMask = this.mask4;
      this.cardLength = 16;
    }
    this.updateCardType.emit(this.cardType);

    if (this.value.length > this.cardLength) {
      this.value = this.value.substring(0, this.cardLength);
    }
    inputElement.value = this.mask(this.cardMask);
    if (this.value.length > this.caretPosition || this.isDelete) {
      inputElement.selectionStart = this.caretPosition;
      inputElement.selectionEnd = this.caretPosition;
    } else {
      inputElement.selectionStart = this.caretPosition + 2;
      inputElement.selectionEnd = this.caretPosition + 2;
    }

    if (this.value.length === this.cardLength) {
      this.isValidCardNumber(this.value);
    }
    this.onChange(this.value);
  }

  /** validates using Luhrs algorithm */
  public isValidCardNumber(cardNumber: string): boolean {
    const numbers = new Array(cardNumber.length);
    let currNumber = 0;
    for (let i = 0; i < numbers.length; i++) {
      currNumber = Number(cardNumber[i]);
      if (isNaN(currNumber)) {
        return false;
      }

      if (i % 2 !== 0) {
        numbers[i] = currNumber;
      } else {
        const n = currNumber * 2;
        numbers[i] = n > 9 ? n % 9 : n;
      }
    }

    return numbers.reduce((prevValue, currValue) => prevValue + currValue, 0) % 10 === 0 && this.value.length === this.cardLength;
  }

  /** */
  private mask(format: string): string {
    const formatLength = format.length;
    let b = 0;
    let maskedOutput = '';
    for (let a = 0; a < this.value.length; a++, b++) {
      if (b >= formatLength) {
        b = 1;
      }

      if (this.maskCharacters.get(format[b])) {
        maskedOutput += this.value[a];
      } else {
        maskedOutput += `${format[b]} ${this.value[a]}`;
        b++;
      }
    }
    return maskedOutput;
  }

  /** */
  private isMasterCard(cardNumber: string): boolean {
    const mostRecent = Number(cardNumber.substring(0, 4));
    return /^5[1-5]/.test(cardNumber) || (mostRecent >= 2221 && mostRecent <= 2721);
  }

  /** */
  private isVisaCard(cardNumber: string): boolean {
    return cardNumber.startsWith('4');
  }

  /** */
  private isAmericanExpressCard(cardNumber: string): boolean {
    return /^3[4|7]/.test(cardNumber);
  }

  /** China T-Union: 31*/
  private isChinaTUnion(cardNumber: string): boolean {
    return cardNumber.startsWith('31');
  }

  /** China Union Pay: 62*/
  private isChinaUnionPay(cardNumber: string): boolean {
    return cardNumber.startsWith('62');
  }

  /** Diners Club International: 36 */
  private isDinersClubInternational(cardNumber: string): boolean {
    return cardNumber.startsWith('36');
  }

  /** Diners Club United States & Canada: 54 */
  private isDinersClubCAUS(cardNumber: string): boolean {
    return cardNumber.startsWith('54');
  }

  /** Discover Card:  6011, 644-649, 65 */
  private isDiscoverCard(cardNumber: string): boolean {
    const range1 = Number(cardNumber.substring(0, 3));
    return cardNumber.startsWith('6011') || cardNumber.startsWith('65') || (range1 >= 644 && range1 <= 649);
  }

  /** Discover Card Co UnionPay: 622126–622925 */
  private isDiscoverCardCoUnionPay(cardNumber: string): boolean {
    const range = Number(cardNumber.substring(0, 6));
    return range >= 622126 && range <= 622925;
  }

  /** Rupay: 60, 65, 81, 82, 508 */
  private isRuPay(cardNumber: string): boolean {
    return cardNumber.startsWith('60') || cardNumber.startsWith('65') || cardNumber.startsWith('81') || cardNumber.startsWith('82') || cardNumber.startsWith('508');
  }

  /** RuPay Co JCB: 353, 356 */
  private isRuPayCoJCB(cardNumber: string): boolean {
    return /^35[3|6]/.test(cardNumber);
  }

  /** InterPayment: 636 */
  private isInterPayment(cardNumber): boolean {
    return cardNumber.startsWith('636');
  }

  /** JCB 3528–3589*/
  private isJCB(cardNumber: string): boolean {
    const range = Number(cardNumber.substring(0, 4));
    return range >= 3528 && range <= 3589;
  }

  /** Maestro UK: 6759, 676770, 676774 */
  private isMaestroUk(cardNumber: string): boolean {
    return cardNumber.startsWith('6759') || cardNumber.startsWith('676770') || cardNumber.startsWith('676774');
  }

  /** Maestro: 	5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763 */
  private isMaestro(cardNumber: string): boolean {
    return (
      cardNumber.startsWith('5018') ||
      cardNumber.startsWith('5020') ||
      cardNumber.startsWith('5038') ||
      cardNumber.startsWith('5893') ||
      cardNumber.startsWith('6304') ||
      cardNumber.startsWith('6759') ||
      cardNumber.startsWith('6761') ||
      cardNumber.startsWith('6762') ||
      cardNumber.startsWith('6763')
    );
  }

  /** Dankort: 5019 */
  private isDankurt(cardNumber: string): boolean {
    return cardNumber.startsWith('5019');
  }

  /** DankorkCoVisa: 4571 */
  private isDankurtCoVisa(cardNumber: string): boolean {
    return cardNumber.startsWith('4571');
  }

  /** Mir: 2200–2204 */
  private isMir(cardNumber: string): boolean {
    const range = Number(cardNumber.substring(0, 4));
    return range >= 2200 && range <= 2204;
  }

  /** NPS Pridnestrovie: 6054740–6054744 */
  private npsPridnestrovie(cardNumber: string): boolean {
    const range = Number(cardNumber.substring(0, 4));
    return range >= 6054740 && range <= 6054744;
  }

  /** Visa Electron: 4026, 417500, 4508, 4844, 4913, 4917 */
  private isVisaElectron(cardNumber: string): boolean {
    return false;
  }

  /** Troy: 65 9792 */
  private isTroy(cardNumber: string): boolean {
    return cardNumber.startsWith('65') || cardNumber.startsWith('9792');
  }

  /** Verve: 506099–506198, 650002–650027, 507865-507964 */
  private isVerve(cardNumber: string): boolean {
    const range1 = Number(cardNumber.substring(0, 6));
    return (range1 >= 506099 && range1 <= 506198) || (range1 >= 650002 && range1 <= 650027) || (range1 >= 507865 && range1 <= 507964);
  }
}
