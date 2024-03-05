import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiColoredTextModule } from 'nextsapien-component-lib';
import { GuruHeaderComponent } from './guru-header.component';
import { GuruHeaderService } from './guru-header.service';

@NgModule({
  declarations: [GuruHeaderComponent],
  imports: [CommonModule, IonicModule, MultiColoredTextModule, TranslateModule, MatTooltipModule],
  exports: [GuruHeaderComponent],
  providers: [GuruHeaderService],
})
export class GuruHeaderModule {}
