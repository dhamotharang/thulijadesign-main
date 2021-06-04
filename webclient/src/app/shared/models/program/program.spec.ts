import { Program } from './program';

describe('Program', () => {
  it('should create an instance', () => {
    expect(new Program(0, 0, 0, 0)).toBeTruthy();
  });
});