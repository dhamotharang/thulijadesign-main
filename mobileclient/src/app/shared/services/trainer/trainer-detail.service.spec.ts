import { TestBed } from '@angular/core/testing';

import { TrainerDetailService } from './trainerdetail.service';

describe('TrainerDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerDetailService = TestBed.get(TrainerDetailService);
    expect(service).toBeTruthy();
  });
});
