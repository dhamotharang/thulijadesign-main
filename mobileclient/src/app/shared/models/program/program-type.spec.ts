import { ProgramType } from './program-type';

describe('ProgramType', () => {
  it('should create an instance', () => {
    expect(new ProgramType(0, 0, "", "", 0)).toBeTruthy();
  });
});