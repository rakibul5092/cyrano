import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationRoute } from 'src/app/modules/user-registration/enums/user-registration-route.enum';

@Directive({
  selector: '[appSubmitOnEnter]',
})
export class SubmitOnEnterDirective {
  @Input()
  route: string;
  @Output() enter: EventEmitter<boolean> = new EventEmitter<any>();
  constructor(private router: Router) {}
  @HostListener('window:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter' && UserRegistrationRoute[this.route] == this.router.url) {
      event.preventDefault();
      this.enter.emit(true);
    }
  }
}
