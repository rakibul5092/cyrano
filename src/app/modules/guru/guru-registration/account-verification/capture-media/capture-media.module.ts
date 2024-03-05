import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaptureMediaPageRoutingModule } from './capture-media-routing.module';

import { CaptureMediaPage } from './capture-media.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from 'src/app/modules/shared/components/shared-components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CaptureMediaPageRoutingModule, TranslateModule, SharedComponentsModule],
  declarations: [CaptureMediaPage],
})
export class CaptureMediaPageModule {}
