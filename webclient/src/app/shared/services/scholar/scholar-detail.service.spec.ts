import { TestBed } from '@angular/core/testing';

import { ScholarDetailService } from './scholardetail.service';

describe('ScholarDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarDetailService = TestBed.get(ScholarDetailService);
    expect(service).toBeTruthy();
  });
});
