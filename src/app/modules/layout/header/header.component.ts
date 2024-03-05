import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AUTH_APIS } from 'src/app/lookups/api.lookups';
import { HttpUtilService } from 'src/app/services/http-utils.service';
import { ICONS } from 'src/app/theme/theme.icons';
import { ThemeService } from 'src/app/theme/theme.service';
import { Language } from '../../../models/language.model';
import { CacheKeys, CacheService } from '../../../services/cache-service.service';
import { ChangeDetectorService } from '../../../services/change-detector';
import { CommonUtilService } from '../../../services/common-utils.service';
import { LANGUAGES_LIST, Theme, THEMES_LIST } from '../../../theme/symbols';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user: any;
  @Input() notificationCount = 1;
  @Input() title = 'Jackie';

  @ViewChild('titleContent', { static: false }) titleContent: any;

  public themes = THEMES_LIST;
  public languages: Language[] = LANGUAGES_LIST;

  public icons: any = ICONS[this.themeService.getActiveTheme().icons];
  public showBackButton = true;

  public sideMenuOpen: boolean = false;

  /***/
  constructor(
    private readonly themeService: ThemeService,
    private changeDetectorService: ChangeDetectorService,
    public readonly commonUtilService: CommonUtilService,
    private readonly cacheService: CacheService,
    public nav: NavController,
    private httpService: HttpUtilService,
  ) {}

  /**
   * Setup icons change listener
   */
  ngOnInit(): void {
    this.themeService.iconsChange.subscribe(() => {
      this.icons = ICONS[this.themeService.getActiveTheme().icons];
    });

    // Get current user info
    this.detectCurrentUser();
  }

  /***/
  public detectCurrentUser(): void {
    this.changeDetectorService.watchUserInfoChanges().subscribe((user) => {
      this.user = user;
    });

    if (this.changeDetectorService.userInfoChanged.value) {
      return;
    }
    const rememberMe = this.cacheService.getLocalStorage(CacheKeys.rememberMe);
    if (rememberMe) {
      this.httpService.getRequest(AUTH_APIS.getUser).subscribe((res) => {
        this.user = res.user;
        this.changeDetectorService.emitUserInfo(this.user);
      });
    } else {
      this.user = this.cacheService.getSessionData(CacheKeys.user);
      this.changeDetectorService.emitUserInfo(this.user);
    }
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.cacheService.clearSession();
    this.cacheService.clearLocalStorage();
    this.changeDetectorService.emitUserInfo(null);
    this.commonUtilService.navigate('../');
  }

  /**
   * Switch theme light/dark
   *
   * @param theme
   */
  public changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme.key);
    this.cacheService.saveLocalStorage(CacheKeys.activeTheme, theme.key);
    this.icons = ICONS[this.themeService.getActiveTheme().icons];
  }

  /**
   * toggles side menu if ther exists any app-side-menu
   */
  public toggleSideMenu(): void {
    this.sideMenuOpen = !this.sideMenuOpen;
    const prev = this.commonUtilService.toggleMenu.value;
    this.commonUtilService.toggleMenu.next(!prev);
  }
}
