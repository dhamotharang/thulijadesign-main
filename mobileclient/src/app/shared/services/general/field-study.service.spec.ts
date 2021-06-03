import { TestBed } from '@angular/core/testing';

import { FieldStudyService } from './fieldstudy.service';

describe('FieldStudyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldStudyService = TestBed.get(FieldStudyService);
    expect(service).toBeTruthy();
  });
});
