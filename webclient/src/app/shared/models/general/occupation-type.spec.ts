import { OccupationType } from './occupation-type';

describe('OccupationType', () => {
  it('should create an instance', () => {
    expect(new OccupationType(0, 0, "", "", 0)).toBeTruthy();
  });
});