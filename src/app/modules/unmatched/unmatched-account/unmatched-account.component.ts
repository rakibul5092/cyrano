import { Component, OnInit } from '@angular/core';
import { CacheKeys, CacheService } from 'src/app/services/cache-service.service';
import { ICONS } from 'src/app/theme/theme.icons';
import { ThemeService } from 'src/app/theme/theme.service';
import { CommonUtilService } from '../../../services/common-utils.service';

@Component({
  selector: 'app-unmatched-account',
  templateUrl: './unmatched-account.component.html',
  styleUrls: ['./unmatched-account.component.scss'],
})
export class UnmatchedAccountComponent implements OnInit {
  public icons: any = ICONS[this.themeService.getActiveTheme().icons].unmatched;
  public user: any;

  /**
   * Component Constructor.
   */
  constructor(public commonUtilService: CommonUtilService, private readonly themeService: ThemeService, private cacheService: CacheService) {}

  /**
   * Lifecycle hook, runs 1 time when component intitialized.
   */
  ngOnInit(): void {
    this.user = this.cacheService.getSessionData(CacheKeys.user);
    this.themeService.iconsChange.subscribe(() => {
      this.icons = ICONS[this.themeService.getActiveTheme().icons].unmatched;
    });
  }
}
