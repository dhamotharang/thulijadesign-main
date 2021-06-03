import { TestBed } from '@angular/core/testing';

import { TrainerAddressService } from './traineraddress.service';

describe('TrainerAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerAddressService = TestBed.get(TrainerAddressService);
    expect(service).toBeTruthy();
  });
});
