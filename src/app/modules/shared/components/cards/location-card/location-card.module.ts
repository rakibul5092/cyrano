import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from './location-card.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LocationCardComponent],
  imports: [CommonModule, TranslateModule],
  exports: [LocationCardComponent],
})
export class LocationCardModule {}
