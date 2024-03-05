import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent {
  @Input() icon: string;
  @Input() name: string;
  @Input() side: string;
  @Input() class: string;
  @Input() haveMinutesButton = false;

  @Output() fabBtnClicked: EventEmitter<string> = new EventEmitter();
  @Output() minuteBtnClicked: EventEmitter<number> = new EventEmitter();

  /***/
  constructor() {}

  /**
   * Button click listener
   *
   * @param name
   */
  onButtonClick(name: string): void {
    this.fabBtnClicked.emit(name);
  }

  /**
   * Minute button click listener
   *
   * @param minute
   */
  onMinutesButtonClick(minute: number): void {
    this.minuteBtnClicked.emit(minute);
  }
}
