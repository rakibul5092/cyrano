import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuruServicesFooterComponent } from './guru-services-footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GuruServicesFooterComponent],
  imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule, IonicModule],
  exports: [GuruServicesFooterComponent],
})
export class GuruServicesFooterModule {}
