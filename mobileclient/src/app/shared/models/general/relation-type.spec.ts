import { RelationType } from './relation-type';

describe('RelationType', () => {
  it('should create an instance', () => {
    expect(new RelationType(0, 0, "", "", 0)).toBeTruthy();
  });
});