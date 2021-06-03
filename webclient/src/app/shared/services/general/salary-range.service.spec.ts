import { TestBed } from '@angular/core/testing';

import { SalaryRangeService } from './salaryrange.service';

describe('SalaryRangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryRangeService = TestBed.get(SalaryRangeService);
    expect(service).toBeTruthy();
  });
});
