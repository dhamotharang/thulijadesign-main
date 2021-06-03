import { FieldStudy } from './field-study';

describe('FieldStudy', () => {
  it('should create an instance', () => {
    expect(new FieldStudy(0, 0, "", "", 0)).toBeTruthy();
  });
});