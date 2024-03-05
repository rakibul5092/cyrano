import { Component } from '@angular/core';
import { CommonUtilService } from '../../../services/common-utils.service';
import { LANGUAGES_LIST, Theme, THEMES_LIST } from '../../../theme/symbols';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { ThemeService } from '../../../theme/theme.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
})
export class AuthHeaderComponent {
  public languages: any[] = LANGUAGES_LIST;
  public themes: Theme[] = THEMES_LIST;

  /***/
  constructor(private cacheService: CacheService, public commonUtilService: CommonUtilService, private themeService: ThemeService) {}

  /**
   * Change the theme
   *
   * @param theme name
   */
  public changeTheme(theme): void {
    this.themeService.setTheme(theme);
    this.cacheService.saveLocalStorage(CacheKeys.activeTheme, theme);
  }
}
