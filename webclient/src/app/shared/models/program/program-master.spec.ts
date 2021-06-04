import { ProgramMaster } from './program-master';

describe('ProgramMaster', () => {
  it('should create an instance', () => {
    expect(new ProgramMaster(0, 0, "", 0, 0, "", "", "", "", "", "")).toBeTruthy();
  });
});