import { TestBed } from '@angular/core/testing';

import { SalutationService } from './salutation.service';

describe('SalutationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalutationService = TestBed.get(SalutationService);
    expect(service).toBeTruthy();
  });
});
