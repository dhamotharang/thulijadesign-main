import { Religion } from './religion';

describe('Religion', () => {
  it('should create an instance', () => {
    expect(new Religion(0, 0, "", "", 0)).toBeTruthy();
  });
});