import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CustomRangeComponent } from './custom-range/custom-range.component';
import { RoundedPhotoComponent } from './rounded-photo/rounded-photo.component';
import { VerticalTabbarComponent } from './vertical-tabbar/vertical-tabbar.component';

@NgModule({
  declarations: [RoundedPhotoComponent, VerticalTabbarComponent, CustomRangeComponent],
  imports: [CommonModule, TranslateModule, IonicModule, TranslateModule],
  exports: [RoundedPhotoComponent, VerticalTabbarComponent, CustomRangeComponent],
})
export class UtilModule {}
