import { TestBed } from '@angular/core/testing';

import { RelationTypeService } from './relationtype.service';

describe('RelationTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelationTypeService = TestBed.get(RelationTypeService);
    expect(service).toBeTruthy();
  });
});
