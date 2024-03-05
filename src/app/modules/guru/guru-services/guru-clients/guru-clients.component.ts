import { Component, OnInit } from '@angular/core';
import { GuruClientsService } from './guru-clients.service';
import { ClientModel } from '../models/client.model';

@Component({
  selector: 'app-guru-clients',
  templateUrl: './guru-clients.component.html',
  styleUrls: ['./guru-clients.component.scss'],
})
export class GuruClientsComponent implements OnInit {
  public clients: ClientModel[] = [];
  constructor(private guruClientsService: GuruClientsService) {}

  ngOnInit(): void {
    this.clients = this.guruClientsService.getClients();
  }
}
