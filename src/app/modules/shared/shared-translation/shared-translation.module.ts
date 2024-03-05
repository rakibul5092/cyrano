import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChangeDetectorService } from '../../../services/change-detector';

export const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem(CacheKeys.app + CacheKeys.activeLanguage) ? JSON.parse(localStorage.getItem(CacheKeys.app + CacheKeys.activeLanguage)) : 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true, // <-- PLAY WITH IT
      extend: true, // <-- PLAY WITH IT
    }),
  ],
  exports: [HttpClientModule, TranslateModule],
})
export class SharedTranslationModule {
  constructor(private translate: TranslateService, private readonly cacheService: CacheService, private changeDetectorService: ChangeDetectorService) {
    const lang = cacheService.getLocalStorage(CacheKeys.activeLanguage) || 'en';
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');
    translate.use(lang);
    changeDetectorService.watchTranslationChanges().subscribe((selectedLang) => {
      translate.use(selectedLang);
    });
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedTranslationModule,
      providers: [],
    };
  }
}
