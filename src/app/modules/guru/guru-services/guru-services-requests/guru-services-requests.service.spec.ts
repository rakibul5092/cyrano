import { TestBed } from '@angular/core/testing';

import { GuruServicesRequestsService } from './guru-services-requests.service';

describe('GuruServicesRequestsService', () => {
  let service: GuruServicesRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruServicesRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
