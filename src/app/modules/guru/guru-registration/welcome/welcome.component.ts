import { Component } from '@angular/core';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private headerService: HeaderService) {}

  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(38.5);
  }
}
