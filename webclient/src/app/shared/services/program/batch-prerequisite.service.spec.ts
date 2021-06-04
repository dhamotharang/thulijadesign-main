import { TestBed } from '@angular/core/testing';

import { BatchPrerequisiteService } from './batchprerequisite.service';

describe('BatchPrerequisiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchPrerequisiteService = TestBed.get(BatchPrerequisiteService);
    expect(service).toBeTruthy();
  });
});
