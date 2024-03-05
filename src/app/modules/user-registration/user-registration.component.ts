import { Component } from '@angular/core';
import { HeaderService } from './layout/header/header.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent {
  public showHeader$ = this.headerService.showHeader$;

  /**
   * @param headerService
   */
  constructor(private headerService: HeaderService) {}
}
