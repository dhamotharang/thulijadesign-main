import { ScholarAddress } from './scholar-address';

describe('ScholarAddress', () => {
  it('should create an instance', () => {
    expect(new ScholarAddress(0, 0, 0, "", "", "", "", 0, 0, "", "", "", "", "", "", "", "", "", "")).toBeTruthy();
  });
});