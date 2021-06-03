import { SalaryRange } from './salary-range';

describe('SalaryRange', () => {
  it('should create an instance', () => {
    expect(new SalaryRange(0, 0, "", "", 0)).toBeTruthy();
  });
});