import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [HeaderComponent],
  providers: [HeaderService],
})
export class HeaderModule {}
