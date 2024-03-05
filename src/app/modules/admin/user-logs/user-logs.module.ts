import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogsComponent } from './user-logs.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserLogsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [UserLogsComponent],
})
export class UserLogsModule {}
