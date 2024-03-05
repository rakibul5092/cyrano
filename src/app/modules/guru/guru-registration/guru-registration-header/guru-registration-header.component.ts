import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-guru-registration-header',
  templateUrl: './guru-registration-header.component.html',
  styleUrls: ['./guru-registration-header.component.scss'],
})
export class GuruRegistrationHeaderComponent {
  @Input() hideBackButton: boolean = false;
  constructor(private navController: NavController) {}

  /**
   * on click back
   */
  public back(): void {
    this.navController.back();
  }
}
