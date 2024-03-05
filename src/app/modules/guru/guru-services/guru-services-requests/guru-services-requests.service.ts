import { Injectable } from '@angular/core';
import { DateRequestModel } from '../models/date.request.model';

@Injectable({
  providedIn: 'root',
})
export class GuruServicesRequestsService {
  /**
   *
   * get client requests
   */
  public getClientsRequests(): DateRequestModel[] {
    return [
      {
        id: '1',
        position: {
          lat: 40,
          lng: -20,
        },
        client: {
          id: '1',
          name: 'John Robert',
          profileImage: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
          country: 'Lahore',
          rate: 4.7,
          datingDate: new Date(),
          dates: 3,
          remainingDates: 1,
          accounts: [
            {
              id: '1',
              name: 'Match',
              logo: 'assets/images/dating-platforms/Match-Logo.png',
              x: 1,
            },
            {
              id: '2',
              name: 'Hinge',
              logo: 'assets/images/dating-platforms/Hinge_logo.png',
              x: 2,
            },
            {
              id: '3',
              name: 'Tinder',
              logo: 'assets/images/dating-platforms/Tinder-Logo.png',
              x: 3,
            },
          ],
          accountsType: 'Owned, to create',
        },
      },
      {
        id: '2',
        position: {
          lat: 40,
          lng: -20,
        },
        client: {
          id: '1',
          name: 'John Robert 2',
          profileImage: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
          country: 'Lahore',
          rate: 4.7,
          datingDate: new Date(),
          dates: 3,
          remainingDates: 1,
          accounts: [
            {
              id: '1',
              name: 'Match',
              logo: 'assets/images/dating-platforms/Match-Logo.png',
              x: 1,
            },
            {
              id: '2',
              name: 'Hinge',
              logo: 'assets/images/dating-platforms/Hinge_logo.png',
              x: 2,
            },
            {
              id: '3',
              name: 'Tinder',
              logo: 'assets/images/dating-platforms/Tinder-Logo.png',
              x: 3,
            },
          ],
          accountsType: 'Owned, to create',
        },
      },
      {
        id: '3',
        position: {
          lat: 40,
          lng: -20,
        },
        client: {
          id: '1',
          name: 'John Robert 2',
          profileImage: 'https://semantic-ui.com/images/avatar/large/steve.jpg',
          country: 'Lahore',
          rate: 4.7,
          datingDate: new Date(),
          dates: 3,
          remainingDates: 1,
          accounts: [
            {
              id: '1',
              name: 'Match',
              logo: 'assets/images/dating-platforms/Match-Logo.png',
              x: 1,
            },
            {
              id: '2',
              name: 'Hinge',
              logo: 'assets/images/dating-platforms/Hinge_logo.png',
              x: 2,
            },
            {
              id: '3',
              name: 'Tinder',
              logo: 'assets/images/dating-platforms/Tinder-Logo.png',
              x: 3,
            },
          ],
          accountsType: 'Owned, to create',
        },
      },
    ];
  }
}
