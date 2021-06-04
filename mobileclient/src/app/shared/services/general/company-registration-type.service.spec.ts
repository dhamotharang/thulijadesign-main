import { TestBed } from '@angular/core/testing';

import { CompanyRegistrationTypeService } from './companyregistrationtype.service';

describe('CompanyRegistrationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyRegistrationTypeService = TestBed.get(CompanyRegistrationTypeService);
    expect(service).toBeTruthy();
  });
});
