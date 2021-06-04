import { ScholarFamily } from './scholar-family';

describe('ScholarFamily', () => {
  it('should create an instance', () => {
    expect(new ScholarFamily(0, 0, 0, "", "", 0, "", "", "")).toBeTruthy();
  });
});