import { TestBed } from '@angular/core/testing';

import { ProgramTypeService } from './programtype.service';

describe('ProgramTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramTypeService = TestBed.get(ProgramTypeService);
    expect(service).toBeTruthy();
  });
});
