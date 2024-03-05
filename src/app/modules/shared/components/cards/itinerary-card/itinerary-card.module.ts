import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItineraryCardComponent } from './itinerary-card.component';

@NgModule({
  declarations: [ItineraryCardComponent],
  imports: [CommonModule],
  exports: [ItineraryCardComponent],
})
export class ItineraryCardModule {}
