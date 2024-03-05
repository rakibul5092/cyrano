import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoursesRoutingModule } from './courses-routing.module';

import { ProfileHeaderModule } from 'nextsapien-component-lib';
import { CardsModule } from '../shared/components/cards/cards.module';
import { CourseLeassonComponent } from './course-leasson/course-leasson.component';
import { CourseLeassonsComponent } from './course-leassons/course-leassons.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseLeassonsComponent, CourseLeassonComponent],
  imports: [CommonModule, CoursesRoutingModule, IonicModule, TranslateModule, MatButtonModule, MatMenuModule, ProfileHeaderModule, CardsModule],
})
export class CoursesModule {}
