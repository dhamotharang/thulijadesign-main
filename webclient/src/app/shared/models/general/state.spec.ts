import { State } from './state';

describe('State', () => {
  it('should create an instance', () => {
    expect(new State(0, 0, 0, "", "", 0)).toBeTruthy();
  });
});