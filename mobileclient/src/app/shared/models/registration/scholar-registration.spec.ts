import { ScholarRegistration } from './scholar-registration';

describe('ScholarRegistration', () => {
  it('should create an instance', () => {
    expect(new ScholarRegistration(0, 0, 0, 0, 0, "", "", "", 0, "", "", "", "")).toBeTruthy();
  });
});