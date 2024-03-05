import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent,
    },
  ],
})
export class DropdownComponent implements OnInit, ControlValueAccessor, Validator {
  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('dropdownValue') dropdownValue: ElementRef;

  @Input() data: any[] = [];

  /** field name to be used  for accessing the value to be printed */
  @Input() name: string = 'name';

  /** field name to be used for accessing value */
  @Input() valueProp: string = 'value';

  @Input() labelProp: string = this.valueProp;

  public dropdownOpen: boolean = false;
  public disabled: boolean = false;

  private _value: string;
  private touched: boolean = false;

  private dropdownElem: HTMLElement;

  /** */
  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._renderer.listen('window', 'click', (event: Event) => {
      if (event.target !== this.dropdown.nativeElement && event.target !== this.dropdownValue.nativeElement) {
        this.dropdownOpen = false;
        this.hideDropDown();
      }
    });

    this._renderer.listen('window', 'resize', () => {
      if (this.dropdownOpen) {
        this.adjustDropdownPos();
      }
    });

    this._renderer.listen('window', 'wheel', (event: Event) => {
      if (event.target !== this.dropdown.nativeElement) {
        this.dropdownOpen = false;
        this.hideDropDown();
      }
    });

    this._renderer.listen('window', 'touchstart', (event: Event) => {
      if (event.target !== this.dropdown.nativeElement && event.target !== this.dropdownValue.nativeElement) {
        this.dropdownOpen = false;
        this.hideDropDown();
      }
    });
  }

  /** */
  get selectedFieldName(): string {
    const v = this.data.findIndex((datum) => datum[this.valueProp] === this.value);
    if (v < 0) {
      return '';
    }
    return this.data[v][this.labelProp];
  }

  /** */
  get selectedIndex(): number {
    return this.data.findIndex((datum) => datum.value === this.value);
  }

  /** */
  get value(): string {
    if (this._value) {
      return this._value;
    }
    if (this.data.length > 0) {
      return this.data[0][this.valueProp] || '';
    }
    return '';
  }

  /** */
  @Input() set value(param: string) {
    this._value = param;
  }

  /** */
  ngOnInit(): void {
    this._elementRef.nativeElement.setAttribute('tabindex', '0');
    requestAnimationFrame(this.setDropdown.bind(this));
  }

  /** */
  public onTouched(): any {}

  /** */
  public onChange(value: string): any {}

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
  public validate(control: AbstractControl): ValidationErrors {
    if (this.data.findIndex((datum) => datum[this.valueProp] === control.value) < 0) {
      return { error: true };
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
  public writeValue(value: string): void {
    this.value = value;
  }

  /** */
  public toggle(event: Event): void {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen) {
      this.retakeDropdown();
      this.hideDropDown();
    } else {
      this.projectDropdown();
      this.adjustDropdownPos();
    }
  }

  /** */
  public onInput(event: Event): void {
    const li = event.currentTarget as HTMLElement;
    this.value = li.dataset.value;
    this.onChange(this.value);
  }

  /** */
  public dontBubbleEvent(event): void {
    event.stopPropagation();
  }

  /** */
  public setOverflow(event: Event): void {
    if (this.dropdown.nativeElement.classList.contains('dropdown-open')) {
      this.dropdown.nativeElement.style.overflowY = 'auto';
    } else {
      this.dropdown.nativeElement.style.overflowY = '';
    }
  }

  /** */
  public unsetOverflow(): void {
    this.dropdown.nativeElement.style.overflowY = '';
  }

  /** */
  private hideDropDown(): void {
    this.dropdown.nativeElement.style.maxHeight = '0';
    this.retakeDropdown();
    return;
  }

  /** */
  private adjustDropdownPos(): void {
    const dim = this._elementRef.nativeElement.getBoundingClientRect();
    const x = dim.left;
    const top = dim.top + dim.height;
    const bottom = window.innerHeight - dim.top;
    this.dropdown.nativeElement.style.left = `${x}px`;

    if (bottom < 180) {
      this.dropdown.nativeElement.style.bottom = `${bottom}px`;
      this.dropdown.nativeElement.style.top = 'auto';
      this.dropdown.nativeElement.style.maxHeight = `${dim.top}px`;
    } else {
      this.dropdown.nativeElement.style.bottom = 'auto';
      this.dropdown.nativeElement.style.top = `${top}px`;
      this.dropdown.nativeElement.style.maxHeight = `${window.innerHeight - top}px`;
    }
    this._elementRef.nativeElement.style.minWidth = window.getComputedStyle(this.dropdown.nativeElement).width;
    this.dropdown.nativeElement.style.minWidth = window.getComputedStyle(this._elementRef.nativeElement).width;
  }

  /** */
  private retakeDropdown(): void {
    const body = document.querySelector('body');
    if (!this.dropdownOpen) {
      return;
    }
    if (this.dropdownElem) {
      body.removeChild(this.dropdownElem);
      this._elementRef.nativeElement.appendChild(this.dropdownElem);
    }
  }

  /** */
  private projectDropdown(): void {
    const dropdown = this._elementRef.nativeElement.querySelector('ul');
    if (!dropdown) {
      return;
    }
    const body = document.querySelector('body');
    const styles = window.getComputedStyle(this._elementRef.nativeElement);
    const bg = styles.getPropertyValue('--dropdown-background');
    const color = styles.getPropertyValue('color');
    const borderColorVar = styles.getPropertyValue('--options-border-color');
    const fontSize = styles.getPropertyValue('font-size');
    const hoverBg = styles.getPropertyValue('--options-hover-backgroiund');
    const hoverColor = styles.getPropertyValue('--options-hover-color');

    this.dropdownElem = this._elementRef.nativeElement.removeChild(dropdown);
    this.dropdownElem.style.background = bg;
    this.dropdownElem.style.color = color;
    this.dropdownElem.style.fontSize = fontSize;
    this.dropdownElem.style.setProperty('--options-border-color', borderColorVar);
    this.dropdownElem.style.setProperty('--options-hover-background', hoverBg);
    this.dropdownElem.style.setProperty('--options-hover-color', hoverColor);
    body.appendChild(this.dropdownElem);
  }

  /** */
  private setDropdown(): void {
    this._elementRef.nativeElement.style.minWidth = window.getComputedStyle(this.dropdown.nativeElement).width;
  }
}
