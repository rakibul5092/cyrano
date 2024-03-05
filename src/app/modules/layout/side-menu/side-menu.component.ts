import { ApplicationRef, Component, ElementRef, Injector } from '@angular/core';
import { FooterTab } from 'src/app/models/footer.model';
import { CommonUtilService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  public action = 'FOOTER_TABS.Action';
  public moreOptions = 'FOOTER_TABS.More_Options';
  public selectedTab = 'dashboard';
  public footerTabs: FooterTab[] = [
    {
      name: 'FOOTER_TABS.Dashboard',
      path: 'dashboard',
      iconClass: 'cyrano cyrano-selected-home',
    },
    {
      name: 'FOOTER_TABS.Clients',
      path: 'clients',
      iconClass: 'cyrano cyrano-selected-clients',
    },
    {
      name: 'FOOTER_TABS.Statistics',
      path: 'statistics',
      iconClass: 'cyrano cyrano-circled-dollar',
    },
    {
      name: 'FOOTER_TABS.Account',
      path: 'account',
      iconClass: 'cyrano cyrano-circled-human-avatar',
    },
  ];

  public dashboardSettings: string[] = [
    'DASHBOARD_SETTINGS.Notifications',
    'DASHBOARD_SETTINGS.Settings',
    'DASHBOARD_SETTINGS.SomeOtherSettings',
    'DASHBOARD_SETTINGS.AnotherSetting',
  ];

  public isDocked: boolean = localStorage.getItem('side-menu-is-docked') ? true : false;

  private appElementRef: ElementRef;

  /**
   * @class Represents the side menu for cyrano
   */
  constructor(private appRef: ApplicationRef, private injector: Injector, private elementRef: ElementRef, private commonUtilService: CommonUtilService) {
    this.appElementRef = injector.get(appRef.componentTypes[0]).elementRef;
    if (this.isDocked) {
      this.dockSideMenu();
    } else {
      this.undockSideMenu();
    }
    this.commonUtilService.toggleMenu.subscribe((value) => {
      if (value === true) {
        this.elementRef.nativeElement.classList.add('slide-in');
      } else {
        this.elementRef.nativeElement.classList.remove('slide-in');
      }
    });
  }

  /**
   * @param path the path specified by the tab
   */
  public onTabClick(path: string): void {
    this.selectedTab = path;
    // this.tabChanged.emit(path);
  }

  /**
   *
   */
  public toggleIsDocked(): void {
    this.isDocked = !this.isDocked;
    if (this.isDocked) {
      this.dockSideMenu();
    } else {
      this.undockSideMenu();
    }
  }

  /**
   * Mehod for closing side menu when backdrop is clicked
   */
  public closeSideMenu(): void {
    this.commonUtilService.toggleMenu.next(false);
  }

  /**
   * method docks side menu
   */
  private dockSideMenu(): void {
    this.appElementRef.nativeElement.style.setProperty('--side-menu-width', '300px');
    localStorage.setItem('side-menu-is-docked', 'true');
    this.elementRef.nativeElement.classList.add('side-menu-is-docked');
  }

  /**
   * method undocks side menu
   */
  private undockSideMenu(): void {
    this.appElementRef.nativeElement.style.setProperty('--side-menu-width', '');
    localStorage.removeItem('side-menu-is-docked');
    this.elementRef.nativeElement.classList.remove('side-menu-is-docked');
  }
}
