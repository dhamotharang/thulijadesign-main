import { TestBed } from '@angular/core/testing';

import { ScholarAddressService } from './scholaraddress.service';

describe('ScholarAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarAddressService = TestBed.get(ScholarAddressService);
    expect(service).toBeTruthy();
  });
});
