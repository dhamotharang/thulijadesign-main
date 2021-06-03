import { MaritalStatus } from './marital-status';

describe('MaritalStatus', () => {
  it('should create an instance', () => {
    expect(new MaritalStatus(0, 0, "", "", 0)).toBeTruthy();
  });
});