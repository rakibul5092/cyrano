import { Component } from '@angular/core';
import { CommonUtilService } from '../../services/common-utils.service';
import { CourseModel } from '../shared/components/cards/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses: CourseModel[] = [
    {
      id: 1,
      price: 30,
      title: 'Lesson 1',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 2,
      price: 30,
      title: 'Lesson 2',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 3,
      price: 30,
      title: 'Lesson 3',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 4,
      price: 30,
      title: 'Lesson 4',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 5,
      price: 30,
      title: 'Lesson 5',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 6,
      price: 30,
      title: 'Lesson 6',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 7,
      price: 30,
      title: 'Lesson 7',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
  ];

  constructor(public commonUtilService: CommonUtilService) {}

  /**
   * on click course card open course details
   *
   * @param course
   */
  public onCourseClick(course): void {
    this.commonUtilService.navigate('../courses/course', { id: course.id });
  }
}
