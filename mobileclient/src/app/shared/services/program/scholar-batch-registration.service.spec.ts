import { TestBed } from '@angular/core/testing';

import { ScholarBatchRegistrationService } from './scholarbatchregistration.service';

describe('ScholarBatchRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarBatchRegistrationService = TestBed.get(ScholarBatchRegistrationService);
    expect(service).toBeTruthy();
  });
});
