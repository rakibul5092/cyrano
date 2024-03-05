import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, GoogleMapsModule, TranslateModule, IonicModule, MatIconModule, DragDropModule],
  providers: [],
  exports: [MapComponent],
})
export class MapModule {}
