import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { MessageTakeoverComponent } from './message-takeover/message-takeover.component';

@NgModule({
  declarations: [MessageTakeoverComponent, FabButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [MessageTakeoverComponent],
})
export class MessageFabButtonModule {}
