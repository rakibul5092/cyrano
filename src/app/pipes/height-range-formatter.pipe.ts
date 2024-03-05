import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightRangeFormatter',
})
export class HeightRangeFormatterPipe implements PipeTransform {
  /**
   * @param value
   * @returns
   */
  transform(value: { lower: number; upper: number }): unknown {
    const lowerInteger = Math.trunc(value.lower);
    const lowerDecimal = value.lower.toFixed(1).split('.')[1];
    const upperInteger = Math.trunc(value.upper);
    const upperDecimal = value.upper.toFixed(1).split('.')[1];
    // Returning format-->  4’ 3” - 5’ 7”
    return `${lowerInteger}’ ${lowerDecimal}” - ${upperInteger}’ ${upperDecimal}” ft`;
  }
}
