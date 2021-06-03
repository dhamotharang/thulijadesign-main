import { PositionLevel } from './position-level';

describe('PositionLevel', () => {
  it('should create an instance', () => {
    expect(new PositionLevel(0, 0, "", "", 0)).toBeTruthy();
  });
});