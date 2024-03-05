import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotentialDatesComponent } from './potential-dates.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PotentialDatesComponent],
  imports: [CommonModule, IonicModule],
  exports: [PotentialDatesComponent],
})
export class PotentialDatesModule {}
