import { ScholarEducationDetail } from './scholar-education-detail';

describe('ScholarEducationDetail', () => {
  it('should create an instance', () => {
    expect(new ScholarEducationDetail(0, 0, "", 0, 0, "", 0, "", "", "")).toBeTruthy();
  });
});