import { Status } from './status';

describe('Status', () => {
  it('should create an instance', () => {
    expect(new Status(0, 0, "", 0)).toBeTruthy();
  });
});