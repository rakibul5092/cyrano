import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

interface CardDetails {
  month: string;
  year: string;
}
@Component({
  selector: 'app-card-expiry',
  templateUrl: './card-expiry.component.html',
  styleUrls: ['./card-expiry.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CardExpiryComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CardExpiryComponent,
    },
  ],
})
export class CardExpiryComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') input: ElementRef;

  @Input() placeholder: string = 'MM / YY';

  public value: CardDetails = { month: '', year: '' };
  private disabled: boolean = false;
  private isDelete: boolean = false;

  private _value = '';
  private lastCaretPos: number = 0;
  /** */

  /** */
  ngOnInit(): void {
    requestAnimationFrame(this.updateValue.bind(this));
  }

  /** */
  public onTouched(): any {}

  /** */
  public onChange(card: CardDetails): any {}

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
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;
    const yearValue = Number(control.value.year);
    const monthValue = Number(control.value.month);

    const valid = yearValue === currentYear ? monthValue >= currentMonth : yearValue > currentYear;
    return valid ? null : { expired: true };
  }

  /** */
  public writeValue(expiry: CardDetails): void {
    this.value.month = expiry.month;
    this.value.year = expiry.year.slice(-2);
    this._value = this.value.month.concat(this.value.year);
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

    if (!/\d/.test(key)) {
      event.preventDefault();
      return;
    }
  }

  /** */
  public onInput(): void {
    this.lastCaretPos = this.input.nativeElement.selectionStart;
    const arr = this.input.nativeElement.value.replace(/\s/g, '').split('/');
    let val = arr[0];
    const firstNum = val[0];
    if (firstNum > '1') {
      val = '0' + val;
    } else {
      if (val.length > 1 && val[0] > 0 && val[1] > '2') {
        val = firstNum + '2';
      }
    }

    this.value.month = val;
    if (!(firstNum === '0' && val < 2)) {
      if (arr.length > 1) {
        const val2 = arr[1];
        val += val2;
        this.value.year = arr[1];
      } else {
        this.value.year = '';
      }
    }
    this._value = val;
    this.updateValue();
  }

  /** */
  public checkYear(): void {
    const arr = this.input.nativeElement.value.replace(/\s/g, '').split('/');
    if (arr.length < 2) {
      return;
    }
    let val = arr[1];
    if (val.length < 2) {
      val = val.padStart(2, '0');
    }
    this._value = this.value.month.concat(val);
    this.updateValue();
  }

  /** */
  public updateValue(): void {
    let val = '';
    for (let i = 0; i < this._value.length; i++) {
      val += this._value[i];
      if (i === 1) {
        val += ' / ';
      }
    }

    this.input.nativeElement.value = val;
    if (this.isDelete) {
      this.input.nativeElement.selectionStart = this.lastCaretPos;
      this.input.nativeElement.selectionEnd = this.input.nativeElement.selectionStart;
    }

    this.onChange(this.value);
  }
}
