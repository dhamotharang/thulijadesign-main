import { TestBed } from '@angular/core/testing';

import { TrainerOccupationService } from './traineroccupation.service';

describe('TrainerOccupationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerOccupationService = TestBed.get(TrainerOccupationService);
    expect(service).toBeTruthy();
  });
});
