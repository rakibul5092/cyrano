import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { AdminRoutingModule } from './admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { UserLogsModule } from './user-logs/user-logs.module';
import { UserLogsPageComponent } from './user-logs-page/user-logs-page.component';
import { ProfileHeaderModule, MultiColoredTextModule } from 'nextsapien-component-lib';
import { LayoutModule } from '../layout/layout.module';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  declarations: [DashboardComponent, LoginComponent, ProfileComponent, UserLogsPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    MatTabsModule,
    UserLogsModule,
    ProfileHeaderModule,
    MultiColoredTextModule,
    LayoutModule,
    SwiperModule,
  ],
})
export class AdminModule {}
