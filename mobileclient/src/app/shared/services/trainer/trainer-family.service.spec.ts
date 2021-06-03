import { TestBed } from '@angular/core/testing';

import { TrainerFamilyService } from './trainerfamily.service';

describe('TrainerFamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerFamilyService = TestBed.get(TrainerFamilyService);
    expect(service).toBeTruthy();
  });
});
