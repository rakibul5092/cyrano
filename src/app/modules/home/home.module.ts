import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, MatButtonModule, MatMenuModule, TranslateModule, LayoutModule],
  declarations: [HomePage],
})
export class HomePageModule {}
