import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseLeassonsComponent } from './course-leassons/course-leassons.component';
import { CourseLeassonComponent } from './course-leasson/course-leasson.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'course', component: CourseComponent },
  { path: 'course/lessons', component: CourseLeassonsComponent },
  { path: 'course/lessons/lesson', component: CourseLeassonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
