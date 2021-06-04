import { TestBed } from '@angular/core/testing';

import { ScholarOccupationService } from './scholaroccupation.service';

describe('ScholarOccupationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarOccupationService = TestBed.get(ScholarOccupationService);
    expect(service).toBeTruthy();
  });
});
