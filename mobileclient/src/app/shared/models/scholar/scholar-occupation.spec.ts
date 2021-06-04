import { ScholarOccupation } from './scholar-occupation';

describe('ScholarOccupation', () => {
  it('should create an instance', () => {
    expect(new ScholarOccupation(0, 0, "", "", 0, 0, "", "", "", 0, 0, "")).toBeTruthy();
  });
});