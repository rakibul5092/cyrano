import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuruClientsService } from '../guru-clients.service';
import { CommonUtilService } from '../../../../../services/common-utils.service';

@Component({
  selector: 'app-dating-account',
  templateUrl: './dating-account.component.html',
  styleUrls: ['./dating-account.component.scss'],
})
export class DatingAccountComponent {
  public account: any;
  public icons: any = this.commonUtilService.icons;

  constructor(private route: ActivatedRoute, private commonUtilService: CommonUtilService, private guruClientsService: GuruClientsService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.account = this.guruClientsService.getClientDatingAccount(id);
  }
}
