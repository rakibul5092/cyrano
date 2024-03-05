import { Component, Input, OnInit } from '@angular/core';
import { ICONS } from 'src/app/theme/theme.icons';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-message-takeover',
  templateUrl: './message-takeover.component.html',
  styleUrls: ['./message-takeover.component.scss'],
})
export class MessageTakeoverComponent implements OnInit {
  @Input() user: any;

  commonIcons = ICONS.commonIcons;
  icons = ICONS[this.themeService.getActiveTheme().icons];

  /***/
  constructor(private readonly themeService: ThemeService) {}

  /**
   * Some Initializations
   * Listen to icon change
   */
  ngOnInit(): void {
    // Icon change detection on theme change
    this.themeService.iconsChange.subscribe(() => {
      this.icons = ICONS[this.themeService.getActiveTheme().icons];
    });
  }

  /**
   * Fab button click listener
   *
   * @param btnName
   */
  onFabBtnClicked(btnName: string): void {}

  /**
   * Min button Listener
   *
   * @param minute
   */
  onMinBtnClicked(minute: number): void {}
}
