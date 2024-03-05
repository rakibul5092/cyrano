import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateInfoPageComponent } from './update-info-page.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UpdateInfoPageComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [UpdateInfoPageComponent],
})
export class UpdateInfoPageModule {}
