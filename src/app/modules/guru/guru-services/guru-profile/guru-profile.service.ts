import { Injectable } from '@angular/core';
import { IGuruProfile } from './guru-profile.model';

@Injectable({
  providedIn: 'root',
})
export class GuruProfileService {
  profile: IGuruProfile;

  constructor() {
    this.profile = this.getProfile();
  }

  public getProfile(): IGuruProfile {
    return {
      id: 0,
      name: 'Jackie Burkhart',
      value: 20,
      photo: '/profile-guru-1.jpg',
      notification: 5,
      age: 23,
      address: 'No address',
      numberOfReviews: 24,
      averageRating: 4.5,
      reviews: [
        {
          reviewer: { name: 'John Robert', profilePhotoUrl: '/assets/images/sample_reviewer_1_image.jpg' },
          rating: 5.0,
          date: new Date(),
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis mattis aliquet fringilla sit integer. Hendrerit pharetra ornare non.',
        },
        {
          reviewer: { name: 'Michael James', profilePhotoUrl: '/assets/images/sample_reviewer_2_image.jpg' },
          rating: 4.5,
          date: new Date(2021, 12, 3),
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis mattis aliquet fringilla sit integer. Hendrerit pharetra ornare non.',
        },
      ],
    };
  }
}
