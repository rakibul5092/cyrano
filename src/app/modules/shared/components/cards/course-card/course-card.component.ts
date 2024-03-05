import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course: CourseModel;
  @Output() cardClickEvent: EventEmitter<any> = new EventEmitter();

  constructor(public commonUtilService: CommonUtilService) {}
}
