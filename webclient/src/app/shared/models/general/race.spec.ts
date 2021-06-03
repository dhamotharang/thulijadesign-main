import { Race } from './race';

describe('Race', () => {
  it('should create an instance', () => {
    expect(new Race(0, 0, "", "", 0)).toBeTruthy();
  });
});