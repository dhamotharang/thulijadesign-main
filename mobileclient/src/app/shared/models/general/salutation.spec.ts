import { Salutation } from './salutation';

describe('Salutation', () => {
  it('should create an instance', () => {
    expect(new Salutation(0, 0, "", "", 0)).toBeTruthy();
  });
});