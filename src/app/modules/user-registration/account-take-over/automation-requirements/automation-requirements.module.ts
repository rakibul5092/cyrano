import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DashedCheckboxModule } from 'nextsapien-component-lib';
import { SharedComponentsModule } from 'src/app/modules/shared/components/shared-components.module';
import { AutomationRequirementsComponent } from './automation-requirements.component';

const routes: Routes = [
  {
    path: '',
    component: AutomationRequirementsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatIconModule,
    SharedComponentsModule,
    TranslateModule,
    DashedCheckboxModule,
  ],
  declarations: [AutomationRequirementsComponent],
})
export class AutomationRequirementsModule {}
