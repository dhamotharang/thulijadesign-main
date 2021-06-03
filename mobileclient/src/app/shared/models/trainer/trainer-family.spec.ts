import { TrainerFamily } from './trainer-family';

describe('TrainerFamily', () => {
  it('should create an instance', () => {
    expect(new TrainerFamily(0, 0, 0, "", "", 0, "", "", "")).toBeTruthy();
  });
});