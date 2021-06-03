import { Trainer } from './trainer';

describe('Trainer', () => {
  it('should create an instance', () => {
    expect(new Trainer(0, 0, 0, 0, "", 0, "", "", 0, 0, "", "", "", 0, 0, 0)).toBeTruthy();
  });
});