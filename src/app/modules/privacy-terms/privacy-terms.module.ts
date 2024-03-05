import { NgModule } from '@angular/core';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../user-registration/layout/header/header.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: 'policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'conditions',
    component: TermsConditionsComponent,
  },
];

@NgModule({
  imports: [PipesModule, RouterModule.forChild(routes), IonicModule, HeaderModule, TranslateModule],
  declarations: [PrivacyPolicyComponent, TermsConditionsComponent],
  exports: [PrivacyPolicyComponent, TermsConditionsComponent],
})
export class PrivacyTermsModule {}
