import { ScholarBatchRegistration } from './scholar-batch-registration';

describe('ScholarBatchRegistration', () => {
  it('should create an instance', () => {
    expect(new ScholarBatchRegistration(0, 0, 0, 0, 0, "", "")).toBeTruthy();
  });
});