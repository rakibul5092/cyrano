export class Card {
  _id?: string;
  owner: { firstName: string; lastName: string };
  cardNumber: string;
  expiry: { month: string; year: string };
  cvc: string;
  type: string = 'unknown';
  default?: boolean = false;
}
