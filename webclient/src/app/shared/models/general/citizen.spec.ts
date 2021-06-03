import { Citizen } from './citizen';

describe('Citizen', () => {
  it('should create an instance', () => {
    expect(new Citizen(0, 0, 0, "", "", 0)).toBeTruthy();
  });
});