import { TestBed } from '@angular/core/testing';

import { ProgramTagService } from './programtag.service';

describe('ProgramTagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramTagService = TestBed.get(ProgramTagService);
    expect(service).toBeTruthy();
  });
});
