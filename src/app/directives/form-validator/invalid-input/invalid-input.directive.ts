import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appInvalidInput]',
})
export class InvalidInputDirective implements OnInit, OnDestroy {
  @Input() appInvalidInput: string;
  private control: AbstractControl;
  private controlSubscription: Subscription;
  private formSubmitSubscription: Subscription;

  constructor(private _fg: ControlContainer, private _el: ElementRef, private render: Renderer2) {}

  get form(): any {
    return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null;
  }

  @HostListener('focus', ['$event'])
  private onFocus($event): void {
    this.setInvalidClass();
  }

  @HostListener('blur', ['$event'])
  private onBlur($event): void {
    this.setInvalidClass();
  }

  ngOnInit(): void {
    this.control = this.form.get(this.appInvalidInput);
    this.controlSubscription = this.control.statusChanges.subscribe((value) => {
      this.setInvalidClass();
    });
    this.formSubmitSubscription = (this._fg as FormGroupDirective).ngSubmit.subscribe(() => {
      this.form.markAllAsTouched();
      this.setInvalidClass();
    });
  }

  ngOnDestroy(): void {
    this.formSubmitSubscription.unsubscribe();
    this.controlSubscription.unsubscribe();
  }

  private setInvalidClass(): void {
    if (this.control.invalid && this.control.touched) {
      this.control.markAsTouched({ onlySelf: true });
      this.render.addClass(this._el.nativeElement, 'invalid-input');
    } else {
      this.render.removeClass(this._el.nativeElement, 'invalid-input');
    }
  }
}
