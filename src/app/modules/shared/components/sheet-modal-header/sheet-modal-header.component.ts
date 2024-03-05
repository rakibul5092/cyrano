import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-sheet-modal-header',
  templateUrl: './sheet-modal-header.component.html',
  styleUrls: ['./sheet-modal-header.component.scss'],
})
export class SheetModalHeaderComponent {
  @Input() loading: boolean;
  @Input() modalTitle: string;
  @Input() saveButtonTitle: string;
  @Output() saveEvent: EventEmitter<void> = new EventEmitter<void>();
  @ContentChild('leftContent') leftContent: TemplateRef<ElementRef>;

  /**
   * on save button click
   */
  public onSave(): void {
    this.saveEvent.emit();
  }
}
