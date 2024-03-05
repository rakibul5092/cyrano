import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PopupModalService } from 'nextsapien-component-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_APIS } from './lookups/api.lookups';
import { CacheKeys, CacheService } from './services/cache-service.service';
import { ChangeDetectorService } from './services/change-detector';
import { HttpUtilService } from './services/http-utils.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public user: any;
  public _portal: TemplatePortal<string>;
  @ViewChild('dynamicModal', { read: ViewContainerRef }) dynamicModal: ViewContainerRef;
  /**
   * */
  constructor(
    private readonly cacheService: CacheService,
    public translate: TranslateService,
    public readonly themeService: ThemeService,
    private readonly changeDetector: ChangeDetectorService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    public elementRef: ElementRef,
    private httpService: HttpUtilService,
    private popupModalService: PopupModalService,
  ) {
    this.themeService.init(this.cacheService.getLocalStorage(CacheKeys.activeTheme));
    router.events.subscribe((val: RouterEvent) => {
      if (val instanceof NavigationEnd) {
        const titleString: string = this.route.firstChild.snapshot.data.title;
        title.setTitle(`Cyrano${titleString ? ' - ' + titleString : ''}`);
        if (this.route.firstChild.snapshot.data.meta) {
          meta.addTags(this.route.firstChild.snapshot.data.meta);
        }
      }
    });
    const lang = this.cacheService.getLocalStorage(CacheKeys.activeLanguage) || 'en';
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');
    translate.use(lang);
  }

  ngAfterViewInit() {
    this.popupModalService.setRootViewContainerRef(this.dynamicModal);
    this.popupModalService.insertModalComponent();
  }

  get hideFooter(): Observable<boolean> {
    return this.route.children.pop()?.data.pipe(map((data) => data['showFooter'] !== undefined && data['showFooter'] === false));
  }

  get currentRoute(): any {
    return this.router.url;
  }

  /**
   * Get user data and initialize watcher for user data change
   */
  ngOnInit(): void {
    // get current loggedin user info
    this.getUser();
  }

  /***/
  private getUser(): void {
    const rememberMe = this.cacheService.getLocalStorage(CacheKeys.rememberMe);

    if (rememberMe) {
      this.httpService.getRequest(AUTH_APIS.getUser).subscribe((res) => {
        this.user = res.user;
        this.changeDetector.emitUserInfo(this.user);
      });
    } else {
      this.user = this.cacheService.getSessionData(CacheKeys.user);
      this.changeDetector.emitUserInfo(this.user);
    }

    this.changeDetector.watchUserInfoChanges().subscribe((user) => {
      this.user = user;
    });
  }
}
