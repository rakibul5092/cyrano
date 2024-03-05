import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidInput]',
})
export class FocusInvalidInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit(): void {
    const invalidControl = this.el.nativeElement?.querySelector('.invalid-input');
    if (invalidControl) {
      invalidControl.focus();
    }
    const nestedInput = invalidControl?.querySelector('input');
    if (nestedInput) {
      nestedInput.focus();
    }
  }
}
