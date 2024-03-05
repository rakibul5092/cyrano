import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
})
export class AddLocationComponent {
  constructor(private modalController: ModalController) {}

  public submit(): void {}
}
