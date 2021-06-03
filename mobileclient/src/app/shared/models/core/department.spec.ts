import { Department } from './department';

describe('Department', () => {
  it('should create an instance', () => {
    expect(new Department(0, 0, 0, 0, "", "")).toBeTruthy();
  });
});