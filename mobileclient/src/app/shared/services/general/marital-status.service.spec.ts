import { TestBed } from '@angular/core/testing';

import { MaritalStatusService } from './maritalstatus.service';

describe('MaritalStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaritalStatusService = TestBed.get(MaritalStatusService);
    expect(service).toBeTruthy();
  });
});
