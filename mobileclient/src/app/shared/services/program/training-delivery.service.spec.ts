import { TestBed } from '@angular/core/testing';

import { TrainingDeliveryService } from './trainingdelivery.service';

describe('TrainingDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingDeliveryService = TestBed.get(TrainingDeliveryService);
    expect(service).toBeTruthy();
  });
});
