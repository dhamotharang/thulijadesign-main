import { TrainerOccupation } from './trainer-occupation';

describe('TrainerOccupation', () => {
  it('should create an instance', () => {
    expect(new TrainerOccupation(0, 0, "", "", 0, 0, "", "", "", 0, 0, "")).toBeTruthy();
  });
});