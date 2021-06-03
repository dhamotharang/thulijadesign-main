import { TestBed } from '@angular/core/testing';

import { PositionLevelService } from './positionlevel.service';

describe('PositionLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionLevelService = TestBed.get(PositionLevelService);
    expect(service).toBeTruthy();
  });
});
