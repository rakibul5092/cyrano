import { TestBed } from '@angular/core/testing';

import { GuruItinerariesService } from './guru-itineraries.service';

describe('GuruItinerariesService', () => {
  let service: GuruItinerariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruItinerariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
