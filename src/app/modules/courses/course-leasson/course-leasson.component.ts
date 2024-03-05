import { Component } from '@angular/core';
import { VideoModel } from '../../shared/components/cards/video-card/video.model';

@Component({
  selector: 'app-course-leasson',
  templateUrl: './course-leasson.component.html',
  styleUrls: ['./course-leasson.component.scss'],
})
export class CourseLeassonComponent {
  public video: VideoModel = {
    title: 'Project Masculinity',
    subTitle: 'Lesson 1',
    url: 'https://media.vimejs.com/720p.mp4',
    poster: 'https://media.vimejs.com/poster.png',
  };
}
