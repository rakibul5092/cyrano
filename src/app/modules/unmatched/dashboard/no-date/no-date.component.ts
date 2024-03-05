import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-date',
  templateUrl: './no-date.component.html',
  styleUrls: ['./no-date.component.scss'],
})
export class NoDateComponent {
  @Input()
  title: string;

  @Input()
  highlight: string;

  /** */
}
