import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  public intervalsName = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  public intervalsTime = [1000, 60000, 3600000, 86400000, 604800000, 2592000000, 31536000000];

  transform(value: Date, ...args: unknown[]): string {
    const now = Date.now(); //   now
    const then = value.getTime();
    const duration = now - then;

    if (duration < 0) {
      return null;
    }
    if (duration < 1000) {
      return 'just now';
    }

    for (let i = this.intervalsTime.length - 1; duration < this.intervalsTime[i] && i > 0; i--) {
      const rounds = Math.floor(duration / this.intervalsTime[i]);
      return rounds === 1 ? `${rounds} ${this.intervalsName[i]} ago` : `${rounds} ${this.intervalsName[i]}s ago`;
    }
  }
}
