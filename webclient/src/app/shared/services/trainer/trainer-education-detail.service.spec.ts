import { TestBed } from '@angular/core/testing';

import { TrainerEducationDetailService } from './trainereducationdetail.service';

describe('TrainerEducationDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerEducationDetailService = TestBed.get(TrainerEducationDetailService);
    expect(service).toBeTruthy();
  });
});
