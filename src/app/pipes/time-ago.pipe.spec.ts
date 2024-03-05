import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();

    expect(pipe.transform(new Date(2022, 10, 12))).toEqual('1day ago');
  });
});
