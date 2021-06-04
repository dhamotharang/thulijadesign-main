import { TestBed } from '@angular/core/testing';

import { TrainingModeService } from './trainingmode.service';

describe('TrainingModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingModeService = TestBed.get(TrainingModeService);
    expect(service).toBeTruthy();
  });
});
