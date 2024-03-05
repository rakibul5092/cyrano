import { TestBed } from '@angular/core/testing';

import { GuruDashboardService } from './guru-dashboard.service';

describe('GuruDashboardService', () => {
  let service: GuruDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
