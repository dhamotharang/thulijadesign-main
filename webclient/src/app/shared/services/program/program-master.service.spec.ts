import { TestBed } from '@angular/core/testing';

import { ProgramMasterService } from './programmaster.service';

describe('ProgramMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramMasterService = TestBed.get(ProgramMasterService);
    expect(service).toBeTruthy();
  });
});
