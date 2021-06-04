import { TestBed } from '@angular/core/testing';

import { BatchModuleService } from './batchmodule.service';

describe('BatchModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchModuleService = TestBed.get(BatchModuleService);
    expect(service).toBeTruthy();
  });
});
