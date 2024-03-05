import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICONS } from 'src/app/theme/theme.icons';
import { ThemeService } from 'src/app/theme/theme.service';
import { TabModel } from '../../../models/tab.model';

@Component({
  selector: 'app-footer-tabs',
  templateUrl: './footer-tabs.component.html',
  styleUrls: ['./footer-tabs.component.scss'],
})
export class FooterTabsComponent implements OnInit, OnDestroy {
  @Input() user: any; // hide footer tab bar when user not logged in.
  @Output() tabChanged: EventEmitter<string> = new EventEmitter(); // Emits route path for selected tab
  @Input() activeTab;

  public icons = ICONS[this.themeService.getActiveTheme().icons] as (typeof ICONS)['light'];
  public footerTabs: TabModel[] = [
    { name: 'home', title: 'UNMATCHED.FOOTER.HOME', icon: 'home', activeIcon: 'homeActive', route: '/home' },
    { name: 'requests', title: 'UNMATCHED.FOOTER.REQUESTS', icon: 'heart', activeIcon: 'heartActive', route: '/requests' },
    { name: 'matches', title: 'UNMATCHED.FOOTER.MATCHES', icon: 'chat', activeIcon: 'chatActive', route: '/matches' },
    { name: 'itineraries', title: 'UNMATCHED.FOOTER.ITINERARIES', icon: 'itineraries', activeIcon: 'itinerariesActive', route: '/itineraries' },
    { name: 'profile', title: 'UNMATCHED.FOOTER.PROFILE', icon: 'profile', activeIcon: 'profileActive', route: '/profile' },
  ];

  public excludeRoutes: string[] = ['/guru-services'];
  public currentRoute: string;
  public currentRoutExcluded: boolean;
  private routerEvents: Subscription;

  /***/
  constructor(private readonly themeService: ThemeService, private router: Router) {
    this.currentRoute = router.url;
    this.checkExcludedRoutes();
    this.routerEvents = this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.checkExcludedRoutes();
      }
    });
  }

  /**
   * Listen to theme change and update icons
   */
  ngOnInit(): void {
    this.themeService.iconsChange.subscribe(() => {
      this.icons = ICONS[this.themeService.getActiveTheme().icons];
    });
  }

  ngOnDestroy(): void {
    this.routerEvents.unsubscribe();
  }

  /**
   * check if footer is visible in the current route or note
   */
  checkExcludedRoutes(): void {
    if (this.currentRoute) {
      this.currentRoutExcluded = false;
      this.excludeRoutes.forEach((route) => {
        if (this.currentRoute !== '/' && this.currentRoute.includes(route)) {
          this.currentRoutExcluded = true;
        }
      });
    }
  }

  /**
   * On tab click action,
   * change current tab and
   * emit tabChanged Observable
   *
   * @param path
   */
  public onTabClick(path: string): void {
    this.activeTab = path;
    this.tabChanged.emit(path);
  }
}
