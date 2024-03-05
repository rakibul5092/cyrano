import { Component, OnInit } from '@angular/core';
import { GuruHeaderService } from '../../guru-header/guru-header.service';

@Component({
  selector: 'app-client-events',
  templateUrl: './client-events.component.html',
  styleUrls: ['./client-events.component.scss'],
})
export class ClientEventsComponent implements OnInit {
  private headerTitle: string = 'CLIENT_EVENTS';

  /**
   * @param guruHeaderService
   */
  constructor(private guruHeaderService: GuruHeaderService) {}

  /***/
  ngOnInit(): void {
    this.guruHeaderService.setTitle({ title: this.headerTitle });
  }
}
