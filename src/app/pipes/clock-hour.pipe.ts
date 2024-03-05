import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clockHour',
})
export class ClockHour implements PipeTransform {
  transform(hour: number): number {
    const hr = hour === 12 || hour === 0 ? 12 : hour % 12;
    return hr;
  }
}
