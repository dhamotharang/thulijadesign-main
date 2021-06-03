import { TestBed } from '@angular/core/testing';

import { GroupMenuService } from './groupmenu.service';

describe('GroupMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupMenuService = TestBed.get(GroupMenuService);
    expect(service).toBeTruthy();
  });
});
