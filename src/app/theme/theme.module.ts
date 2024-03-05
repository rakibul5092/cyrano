import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from './theme.service';
import { THEMES, ACTIVE_THEME, ThemeOptions } from './symbols';

@NgModule({
  imports: [CommonModule],
  providers: [ThemeService],
})
export class ThemeModule {
  /**
   * For root method for theme module, for initial default values
   *
   * @param options
   */
  static forRoot(options: ThemeOptions): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes,
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active,
        },
      ],
    };
  }
}
