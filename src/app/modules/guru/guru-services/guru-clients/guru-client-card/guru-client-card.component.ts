import { Component, Input } from '@angular/core';
import { CommonUtilService } from '../../../../../services/common-utils.service';

@Component({
  selector: 'app-guru-client-card',
  templateUrl: './guru-client-card.component.html',
  styleUrls: ['./guru-client-card.component.scss'],
})
export class GuruClientCardComponent {
  @Input() client;
  constructor(private commonUtilService: CommonUtilService) {}

  /**
   * open client details
   */
  public openClientDetails(): void {
    this.commonUtilService.navigate('../guru-services/clients/client/' + this.client.id);
  }
}
