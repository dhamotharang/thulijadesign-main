import { UserGroup } from './user-group';

describe('UserGroup', () => {
  it('should create an instance', () => {
    expect(new UserGroup(0, 0, 0, 0)).toBeTruthy();
  });
});