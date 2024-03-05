import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';
import { CommonUtilService } from '../../../services/common-utils.service';
import { CourseModel } from '../../shared/components/cards/models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  public orientation: ProfileHeaderOrientation = ProfileHeaderOrientation.vertical;
  public course: CourseModel = {
    id: 1,
    price: 30,
    title: 'Lesson 1',
    cover: 'https://img.mobiscroll.com/demos/card_2.png',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
  };

  /***/
  constructor(public commonUtilService: CommonUtilService) {}

  /**
   * on click course user
   */
  public onCourseClick(): void {
    this.commonUtilService.navigate('../courses/course/lessons', { id: this.course.id });
  }
}
