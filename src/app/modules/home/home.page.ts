import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeDetectorService } from 'src/app/services/change-detector';
import { CacheKeys, CacheService } from '../../services/cache-service.service';
import { CommonUtilService } from '../../services/common-utils.service';
import { LANGUAGES_LIST, Theme, THEMES_LIST } from '../../theme/symbols';
import { ICONS } from '../../theme/theme.icons';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public icons: any = ICONS[this.themeService.getActiveTheme().icons];
  public themes: Theme[] = THEMES_LIST;
  public languages: any[] = LANGUAGES_LIST;
  public user: any;
  private userSubscription: Subscription;

  /***/
  constructor(private cacheService: CacheService, public commonUtilService: CommonUtilService, private themeService: ThemeService, private changeDetector: ChangeDetectorService) {
    this.themeService.showLayout.next(true);
  }

  /**
   * Log user out from app
   */
  logout(): void {
    this.cacheService.clearSession();
    this.changeDetector.emitUserInfo(null);
    this.commonUtilService.navigate('../auth');
  }

  /**
   * Change theme @param theme name
   */
  public changeTheme(theme: string): void {
    this.themeService.setTheme(theme);
    this.cacheService.saveLocalStorage(CacheKeys.activeTheme, theme);
    this.icons = ICONS[this.themeService.getActiveTheme().icons];
  }
}
