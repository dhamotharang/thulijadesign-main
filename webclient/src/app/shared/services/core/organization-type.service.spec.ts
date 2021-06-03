import { TestBed } from '@angular/core/testing';

import { OrganizationTypeService } from './organizationtype.service';

describe('OrganizationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationTypeService = TestBed.get(OrganizationTypeService);
    expect(service).toBeTruthy();
  });
});
