import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePopupComponent } from './message-popup/message-popup.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MessagePopupComponent],
  imports: [CommonModule, TranslateModule],
  exports: [MessagePopupComponent],
})
export class PopupModule {}
