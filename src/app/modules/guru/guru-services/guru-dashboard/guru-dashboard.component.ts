import { Component, OnInit } from '@angular/core';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { GuruClientsService } from '../guru-clients/guru-clients.service';

@Component({
  selector: 'app-common-dashboard',
  templateUrl: './guru-dashboard.component.html',
  styleUrls: ['./guru-dashboard.component.scss'],
})
export class GuruDashboardComponent implements OnInit {
  public clients: any[] = [];
  public icons: any = this.commonUtilService.icons;
  constructor(private commonUtilService: CommonUtilService, private guruClientsService: GuruClientsService) {}

  ngOnInit(): void {
    this.getClients();
  }

  /**
   * get clients
   */
  private getClients(): void {
    this.clients = this.guruClientsService.getClients();
  }
}
