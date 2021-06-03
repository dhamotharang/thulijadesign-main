import { Organization } from './organization';

describe('Organization', () => {
  it('should create an instance', () => {
    expect(new Organization(0, 0, "", "", "", "", 0, 0, "")).toBeTruthy();
  });
});