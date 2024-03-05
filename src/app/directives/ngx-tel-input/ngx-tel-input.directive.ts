import { Directive, ElementRef, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appNgxTelInput]',
})
export class NgxTelInputDirective {
  private removedItems: HTMLElement[] = [];

  constructor(private el: ElementRef, private tls: TranslateService) {}

  @HostListener('click', ['$event']) findSearch(): void {
    const search = document.querySelector('.country-search');
    if (search) {
      this.filterDuplicateUs();
      (search as HTMLInputElement).focus();
      this.tls.get('PLACEHOLDERS.SEARCH').subscribe((translation) => search.setAttribute('placeholder', translation));
      search.addEventListener('input', this.filterDuplicateUs.bind(this));
      search.addEventListener('keydown', this.keyDown.bind(this));
    }
  }

  private filterDuplicateUs(): void {
    //  check if us is going to be presented in the list
    const filterInput = document.querySelector('.country-search') as HTMLInputElement;
    const val = filterInput.value;
    const parent = filterInput.parentNode;
    const divider = parent.querySelector('mat-divider');
    if (!divider) {
      return;
    }

    if (val) {
      while (filterInput.nextElementSibling !== null && filterInput.nextElementSibling.nodeName !== 'MAT-DIVIDER') {
        this.removedItems.push(parent.removeChild(filterInput.nextElementSibling as HTMLElement));
      }
    } else {
      filterInput.after(...this.removedItems);
      this.removedItems = [];
    }
  }

  private keyDown(event) {
    const filterInput = document.querySelector('.country-search') as HTMLInputElement;
    const parent = filterInput.parentNode;
    const buttons = parent.querySelectorAll('button');
    if (event.key === 'ArrowDown') {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
      }
    } else {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  }
}
