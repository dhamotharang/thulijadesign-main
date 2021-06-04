import { CompanyRegistrationType } from './company-registration-type';

describe('CompanyRegistrationType', () => {
  it('should create an instance', () => {
    expect(new CompanyRegistrationType(0, 0, "", "", 0)).toBeTruthy();
  });
});