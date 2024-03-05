import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonCardComponent } from './lesson-card.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LessonCardComponent],
  imports: [CommonModule, IonicModule, TranslateModule, MatButtonModule],
  exports: [LessonCardComponent],
})
export class LessonCardModule {}
