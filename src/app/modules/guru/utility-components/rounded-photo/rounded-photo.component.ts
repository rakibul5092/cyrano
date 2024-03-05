import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-photo',
  templateUrl: './rounded-photo.component.html',
  styleUrls: ['./rounded-photo.component.scss'],
})
export class RoundedPhotoComponent {
  @Input() url: string;
  @Input() width: number;
  @Input() height: number;
}
