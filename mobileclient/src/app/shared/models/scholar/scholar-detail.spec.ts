import { ScholarDetail } from './scholar-detail';

describe('ScholarDetail', () => {
  it('should create an instance', () => {
    expect(new ScholarDetail(0, 0, 0, 0, 0, 0, 0, 0, "", "", 0, 0)).toBeTruthy();
  });
});