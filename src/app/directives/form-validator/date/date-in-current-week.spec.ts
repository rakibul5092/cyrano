import { dateInCurrentWeek } from './date.validator';

describe('DateInCurrentWeek', () => {
  it('should create an instance', () => {
    expect(new dateInCurrentWeek()).toBeTruthy();
  });
});
