import { IReviewer } from './reviewer.interface';

export interface IReview {
  reviewer: IReviewer;
  rating: number;
  date: Date;
  message: string;
}
