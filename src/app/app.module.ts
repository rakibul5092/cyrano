import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { PortalModule } from '@angular/cdk/portal';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LibModalModule } from 'nextsapien-component-lib';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { MessageFabButtonModule } from './modules/message-fab-button/message-fab-button.module';
import { PrivacyTermsModule } from './modules/privacy-terms/privacy-terms.module';
import { CacheKeys } from './services/cache-service.service';
import { AuthInterceptor } from './services/interceptors/auth-interceptor.service';
import { HttpErrorInterceptor } from './services/interceptors/error-interceptor.service';
import { AppStoreModule } from './store/app-store.module';
import { THEMES_LIST } from './theme/symbols';
import { ThemeModule } from './theme/theme.module';

export const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    PortalModule,
    BrowserModule,
    PrivacyTermsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppStoreModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MessageFabButtonModule,
    LibModalModule,
    ThemeModule.forRoot({
      themes: THEMES_LIST,
      active: localStorage.getItem(CacheKeys.app + CacheKeys.activeTheme) || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
    }),
    TranslateModule.forRoot({
      defaultLanguage: JSON.parse(localStorage.getItem(CacheKeys.app + CacheKeys.activeLanguage)) ?? 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
