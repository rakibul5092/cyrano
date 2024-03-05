import { Component } from '@angular/core';

@Component({
  selector: 'app-clients-breakdown',
  templateUrl: './clients-breakdown.component.html',
  styleUrls: ['./clients-breakdown.component.scss'],
})
export class ClientsBreakdownComponent {
  public clients: any[] = [
    {
      name: 'James Sullivan',
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      amount: '3',
      requests: 3,
    },
    {
      name: 'James Sullivan',
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      amount: '3',
      requests: 3,
    },
    {
      name: 'James Sullivan',
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      amount: '3',
      requests: 3,
    },
    {
      name: 'James Sullivan',
      photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      amount: '3',
      requests: 3,
    },
  ];
}
