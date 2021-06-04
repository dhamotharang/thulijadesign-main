import { TrainingDelivery } from './training-delivery';

describe('TrainingDelivery', () => {
  it('should create an instance', () => {
    expect(new TrainingDelivery(0, 0, "", "", 0)).toBeTruthy();
  });
});