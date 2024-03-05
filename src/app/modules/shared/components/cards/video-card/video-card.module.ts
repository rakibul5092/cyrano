import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { VideoCardComponent } from './video-card.component';

@NgModule({
  declarations: [VideoCardComponent],
  imports: [CommonModule, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  exports: [VideoCardComponent],
})
export class VideoCardModule {}
