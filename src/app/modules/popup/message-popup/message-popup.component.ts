import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss'],
})
export class MessagePopupComponent {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data) {}
}
