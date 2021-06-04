import { TestBed } from '@angular/core/testing';

import { ScholarService } from './scholar.service';

describe('ScholarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarService = TestBed.get(ScholarService);
    expect(service).toBeTruthy();
  });
});
