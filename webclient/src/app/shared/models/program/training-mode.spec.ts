import { TrainingMode } from './training-mode';

describe('TrainingMode', () => {
  it('should create an instance', () => {
    expect(new TrainingMode(0, 0, "", "", 0)).toBeTruthy();
  });
});