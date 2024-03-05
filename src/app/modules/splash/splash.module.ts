import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent,
  },
];

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, IonicModule, SwiperModule, RouterModule.forChild(routes), TranslateModule],
})
export class SplashModule {}
