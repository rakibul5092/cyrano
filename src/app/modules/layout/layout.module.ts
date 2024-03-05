import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { FooterTabsComponent } from './footer-tabs/footer-tabs.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeaderComponent, SideMenuComponent, FooterTabsComponent],
  imports: [CommonModule, IonicModule, FormsModule, MatMenuModule, TranslateModule, SharedComponentsModule, MatButtonModule],
  exports: [HeaderComponent, SideMenuComponent, FooterTabsComponent],
})
export class LayoutModule {}
