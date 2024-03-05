import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dating-request-progress',
  templateUrl: './dating-request-progress.component.html',
  styleUrls: ['./dating-request-progress.component.scss'],
})
export class DatingRequestProgressComponent {
  @Input() progressTime;
}
