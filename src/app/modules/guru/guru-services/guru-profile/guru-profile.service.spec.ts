import { TestBed } from '@angular/core/testing';

import { GuruProfileService } from './guru-profile.service';

describe('GuruProfileService', () => {
  let service: GuruProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
