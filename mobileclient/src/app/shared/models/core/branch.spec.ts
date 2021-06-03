import { Branch } from './branch';

describe('Branch', () => {
  it('should create an instance', () => {
    expect(new Branch(0, 0, 0, "", "")).toBeTruthy();
  });
});