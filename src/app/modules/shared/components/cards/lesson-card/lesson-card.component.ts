import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonUtilService } from 'src/app/services/common-utils.service';
import { LessonModel } from '../models/lesson.model';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss'],
})
export class LessonCardComponent {
  @Input() lesson: LessonModel;
  @Output() cardClickEvent: EventEmitter<any> = new EventEmitter();

  constructor(public commonUtilService: CommonUtilService) {}
}
