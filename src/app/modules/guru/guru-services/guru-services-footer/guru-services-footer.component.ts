import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabModel } from '../../../../models/tab.model';
import { CommonUtilService } from '../../../../services/common-utils.service';

@Component({
  selector: 'app-guru-services-footer',
  templateUrl: './guru-services-footer.component.html',
  styleUrls: ['./guru-services-footer.component.scss'],
})
export class GuruServicesFooterComponent {
  @Input() activeTab: string;
  @Output() activeTabChange = new EventEmitter<string>();

  public footerTabs: TabModel[] = [
    { name: 'home', title: 'GURU.FOOTER.HOME', icon: 'home', activeIcon: 'homeActive', route: '../guru-services' },
    { name: 'requests', title: 'GURU.FOOTER.REQUESTS', icon: 'heart', activeIcon: 'heartActive', route: '../guru-services/requests' },
    { name: 'clients', title: 'GURU.FOOTER.CLIENTS', icon: 'chat', activeIcon: 'chatActive', route: '../guru-services/clients' },
    { name: 'itineraries', title: 'GURU.FOOTER.ITINERARIES', icon: 'itineraries', activeIcon: 'itinerariesActive', route: '../guru-services/itineraries' },
    { name: 'profile', title: 'GURU.FOOTER.PROFILE', icon: 'profile', activeIcon: 'profileActive', route: '../guru-services/guru-profile' },
  ];

  public footerIcons = this.commonUtilService.icons?.footer;
  constructor(private commonUtilService: CommonUtilService) {}

  /**
   * navigate to clicked tab screen
   *
   * @param tab
   */
  public openTabScreen(tab: TabModel): void {
    this.activeTab = tab.name;
    this.activeTabChange.emit(this.activeTab);
    this.commonUtilService.navigate(tab.route);
  }
}
