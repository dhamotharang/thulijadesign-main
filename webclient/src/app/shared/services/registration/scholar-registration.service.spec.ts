import { TestBed } from '@angular/core/testing';

import { ScholarRegistrationService } from './scholarregistration.service';

describe('ScholarRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarRegistrationService = TestBed.get(ScholarRegistrationService);
    expect(service).toBeTruthy();
  });
});
