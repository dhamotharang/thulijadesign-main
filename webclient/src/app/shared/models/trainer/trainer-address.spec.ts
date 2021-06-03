import { TrainerAddress } from './trainer-address';

describe('TrainerAddress', () => {
  it('should create an instance', () => {
    expect(new TrainerAddress(0, 0, 0, "", "", "", "", 0, 0, "", "", "", "", "", "", "", "", "", "")).toBeTruthy();
  });
});