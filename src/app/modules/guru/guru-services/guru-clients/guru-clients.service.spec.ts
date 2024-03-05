import { TestBed } from '@angular/core/testing';

import { GuruClientsService } from './guru-clients.service';

describe('GuruClientsService', () => {
  let service: GuruClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
