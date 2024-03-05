import { Component } from '@angular/core';
import { CommonUtilService } from '../../../services/common-utils.service';
import { LessonModel } from '../../shared/components/cards/models/lesson.model';

@Component({
  selector: 'app-course-leassons',
  templateUrl: './course-leassons.component.html',
  styleUrls: ['./course-leassons.component.scss'],
})
export class CourseLeassonsComponent {
  lessons: LessonModel[] = [
    {
      id: 1,
      title: 'Lesson 1',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 2,
      title: 'Lesson 2',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 3,
      title: 'Lesson 3',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 4,
      title: 'Lesson 4',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 5,
      title: 'Lesson 5',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 6,
      title: 'Lesson 6',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
    {
      id: 7,
      title: 'Lesson 7',
      cover: 'https://img.mobiscroll.com/demos/card_2.png',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has ',
    },
  ];

  constructor(public commonUtilService: CommonUtilService) {}

  /**
   * on click course lesson card open lesson details
   *
   * @param lesson
   */
  public onLessonClick(lesson: LessonModel): void {
    this.commonUtilService.navigate('../courses/course/lessons/lesson', { id: lesson.id });
  }
}
