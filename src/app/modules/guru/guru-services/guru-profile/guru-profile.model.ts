import { IReview } from 'src/app/models/review.interface';

export interface IGuruProfile {
  id: number;
  name: string;
  value: number;
  photo: string;
  notification: number;
  age: number;
  address: string;
  reviews: IReview[];
  numberOfReviews: number;
  averageRating: number;
}
