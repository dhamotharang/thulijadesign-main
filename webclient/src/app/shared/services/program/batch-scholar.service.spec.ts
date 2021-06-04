import { TestBed } from '@angular/core/testing';

import { BatchScholarService } from './batchscholar.service';

describe('BatchScholarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchScholarService = TestBed.get(BatchScholarService);
    expect(service).toBeTruthy();
  });
});
