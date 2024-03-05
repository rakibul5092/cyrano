import { ClientModel } from '../models/client.model';
import { DatingAccountModel } from '../models/dating-account.model';

export class GuruClientsService {
  private clients: ClientModel[];

  /**
   * get clients data
   */
  public getClients(): ClientModel[] {
    this.clients = [
      {
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
      },
      {
        id: '2',
        name: 'Micheal James',
        profileImage: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
        country: 'Islamabad',
        rate: 4.9,
        datingDate: new Date(),
        dates: 0,
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
      },
      {
        id: '3',
        name: 'kristy',
        profileImage: 'https://semantic-ui.com/images/avatar2/large/kristy.png',
        country: 'UK',
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
      },
      {
        id: '4',
        name: 'matthew',
        profileImage: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
        country: 'Islamabad',
        rate: 4.9,
        datingDate: new Date(),
        dates: 0,
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
      },
    ];

    return this.clients;
  }

  /**
   * get client data by id
   *
   * @param id
   */
  public getClient(id: string): ClientModel {
    if (!this.clients) {
      this.getClients();
    }
    return this.clients.find((client) => client.id === id);
  }

  /**
   * get client dating account data by id
   *
   * @param id
   */
  public getClientDatingAccount(id: string): DatingAccountModel {
    return {
      id: '',
      name: 'tinder',
      logo: 'assets/images/dating-platforms/Tinder-Logo.png',
      x: 1,
    };
  }
}
