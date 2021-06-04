import { ProgramCategory } from './program-category';

describe('ProgramCategory', () => {
  it('should create an instance', () => {
    expect(new ProgramCategory(0, 0, "", "", 0)).toBeTruthy();
  });
});