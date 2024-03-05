import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule, DashedCheckboxModule } from 'nextsapien-component-lib';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { CircularProgressComponent } from '../util-components/circular-progress/circular-progress.component';
import { ImplicitSwipesComponent } from './implicit-swipes.component';
import { SwipeCardComponent } from './swipe-card/swipe-card.component';
@NgModule({
  declarations: [ImplicitSwipesComponent, SwipeCardComponent, CircularProgressComponent],
  imports: [CommonModule, IonicModule, TranslateModule, CheckboxModule, ReactiveFormsModule, ScrollingModule, CheckboxModule, SharedComponentsModule, DashedCheckboxModule],
})
export class ImplicitSwipesModule {}
