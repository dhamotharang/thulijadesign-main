import { TestBed } from '@angular/core/testing';

import { AddressTypeService } from './addresstype.service';

describe('AddressTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressTypeService = TestBed.get(AddressTypeService);
    expect(service).toBeTruthy();
  });
});
