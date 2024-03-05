import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vertical-tabbar',
  templateUrl: './vertical-tabbar.component.html',
  styleUrls: ['./vertical-tabbar.component.scss'],
})
export class VerticalTabbarComponent implements OnInit, OnDestroy {
  @Input() tabs = ['AUDIENCE', 'OVERLAY', 'CLIENT'];
  public selectedTab = 'OVERLAY';
  public lang = this.translationService.currentLang;
  private langSubs: Subscription;

  /**
   * @param translationService
   */
  constructor(private translationService: TranslateService) {}

  /***/
  ngOnDestroy(): void {
    if (this.langSubs) {
      this.langSubs.unsubscribe();
    }
  }

  /***/
  ngOnInit(): void {
    this.langSubs = this.translationService.onLangChange.subscribe((res) => {
      this.lang = res.lang;
    });
  }

  /**
   * @param tab
   */
  public onTabChange(tab: string): void {
    this.selectedTab = tab;
  }
}
