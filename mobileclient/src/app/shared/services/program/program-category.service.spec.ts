import { TestBed } from '@angular/core/testing';

import { ProgramCategoryService } from './programcategory.service';

describe('ProgramCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramCategoryService = TestBed.get(ProgramCategoryService);
    expect(service).toBeTruthy();
  });
});
