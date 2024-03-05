import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MultiColoredTextModule } from 'nextsapien-component-lib';
import { SubmitOnEnterModule } from 'src/app/directives/submit-form-on-enter/submit-on-enter.module';
import { AgeAndHeightComponent } from './age-and-height/age-and-height.component';
import { FaceAndEthnicityComponent } from './face-and-ethnicity/face-and-ethnicity.component';
import { PreferencesVsSwipesComponent } from './preferences-vs-swipes.component';
import { RackAndAssComponent } from './rack-and-ass/rack-and-ass.component';
import { SelectableItemComponent } from './selectable-item/selectable-item.component';
@NgModule({
  declarations: [PreferencesVsSwipesComponent, AgeAndHeightComponent, FaceAndEthnicityComponent, RackAndAssComponent, SelectableItemComponent],
  imports: [CommonModule, IonicModule, TranslateModule, MultiColoredTextModule, FormsModule, HttpClientModule, SubmitOnEnterModule],
})
export class PreferencesVsSwipesModule {}
// TODO: move preferences-vs-swipes & summary section components to user-registration module
// Reason for not moving it out now: waiting for Anoop's NAN-460 to be done
