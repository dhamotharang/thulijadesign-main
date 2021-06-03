import { TestBed } from '@angular/core/testing';

import { OccupationTypeService } from './occupationtype.service';

describe('OccupationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccupationTypeService = TestBed.get(OccupationTypeService);
    expect(service).toBeTruthy();
  });
});
