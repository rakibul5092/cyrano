import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GuruClientsService } from '../guru-clients.service';
import { CommonUtilService } from '../../../../../services/common-utils.service';

@Component({
  selector: 'app-guru-client',
  templateUrl: './guru-client.component.html',
  styleUrls: ['./guru-client.component.scss'],
})
export class GuruClientComponent {
  public client: any;
  public icons: any = this.commonUtilService.icons;

  constructor(private route: ActivatedRoute, private commonUtilService: CommonUtilService, private guruClientsService: GuruClientsService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.client = this.guruClientsService.getClient(id);
  }

  /**
   * open dating account
   */
  public openDatingAccount(account): void {
    this.commonUtilService.navigate('../guru-services/clients/client/account/' + account.id);
  }
}
