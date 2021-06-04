import { TestBed } from '@angular/core/testing';

import { ScholarFamilyService } from './scholarfamily.service';

describe('ScholarFamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarFamilyService = TestBed.get(ScholarFamilyService);
    expect(service).toBeTruthy();
  });
});
