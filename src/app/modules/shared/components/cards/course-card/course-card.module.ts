import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card.component';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CourseCardComponent],
  imports: [CommonModule, IonicModule, TranslateModule, MatButtonModule],
  exports: [CourseCardComponent],
})
export class CourseCardModule {}
