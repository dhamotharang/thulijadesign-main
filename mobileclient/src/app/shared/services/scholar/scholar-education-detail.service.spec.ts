import { TestBed } from '@angular/core/testing';

import { ScholarEducationDetailService } from './scholareducationdetail.service';

describe('ScholarEducationDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarEducationDetailService = TestBed.get(ScholarEducationDetailService);
    expect(service).toBeTruthy();
  });
});
