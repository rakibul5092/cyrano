import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDateComponent } from './no-date.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiColoredTextModule } from 'nextsapien-component-lib';

@NgModule({
  declarations: [NoDateComponent],
  imports: [CommonModule, IonicModule, TranslateModule, MultiColoredTextModule],
  exports: [NoDateComponent],
})
export class NoDateModule {}
