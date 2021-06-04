import { BatchModule } from './batch-module';

describe('BatchModule', () => {
  it('should create an instance', () => {
    expect(new BatchModule(0, 0, 0, "", "")).toBeTruthy();
  });
});