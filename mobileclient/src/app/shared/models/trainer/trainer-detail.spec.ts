import { TrainerDetail } from './trainer-detail';

describe('TrainerDetail', () => {
  it('should create an instance', () => {
    expect(new TrainerDetail(0, 0, 0, 0, 0, 0, 0, 0, "", "", "", "")).toBeTruthy();
  });
});