import { OrganizationType } from './organization-type';

describe('OrganizationType', () => {
  it('should create an instance', () => {
    expect(new OrganizationType(0, 0, "", "", 0)).toBeTruthy();
  });
});