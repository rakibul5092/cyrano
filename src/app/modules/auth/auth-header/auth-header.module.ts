import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './auth-header.component';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AuthHeaderComponent],
  imports: [CommonModule, IonicModule, MatButtonModule, MatIconModule, TranslateModule, MatMenuModule, MatTooltipModule],
  exports: [AuthHeaderComponent],
})
export class AuthHeaderModule {}
