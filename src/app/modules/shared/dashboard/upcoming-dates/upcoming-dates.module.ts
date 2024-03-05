import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardsModule } from '../../components/cards/cards.module';
import { UpcomingDatesComponent } from './upcoming-dates.component';

@NgModule({
  declarations: [UpcomingDatesComponent],
  imports: [CommonModule, CardsModule, IonicModule],
  exports: [UpcomingDatesComponent],
})
export class UpcomingDatesModule {}
