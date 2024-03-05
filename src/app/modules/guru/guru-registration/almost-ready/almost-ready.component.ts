import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HeaderService } from 'src/app/modules/user-registration/layout/header/header.service';
import { GURU_ROUTES } from '../../enums/guru.enum';

@Component({
  selector: 'app-almost-ready',
  templateUrl: './almost-ready.component.html',
  styleUrls: ['./almost-ready.component.scss'],
})
export class AlmostReadyComponent {
  constructor(private headerService: HeaderService, private navController: NavController) {}

  /***/
  ionViewWillEnter(): void {
    this.headerService.headerProgress$.next(100);
  }

  /***/
  onContinue() {
    this.navController.navigateForward(GURU_ROUTES.GURU_SERVICES, { animated: true, animationDirection: 'forward' });
  }
}
