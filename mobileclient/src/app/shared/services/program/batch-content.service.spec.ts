import { TestBed } from '@angular/core/testing';

import { BatchContentService } from './batchcontent.service';

describe('BatchContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchContentService = TestBed.get(BatchContentService);
    expect(service).toBeTruthy();
  });
});
