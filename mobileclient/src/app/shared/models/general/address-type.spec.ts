import { AddressType } from './address-type';

describe('AddressType', () => {
  it('should create an instance', () => {
    expect(new AddressType(0, 0, "", "", 0)).toBeTruthy();
  });
});