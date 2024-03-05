import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter',
})
export class FilterPipe implements PipeTransform {
  public transform<T>(values: T[], filterFunction: (item: T, ...otherArgs: unknown[]) => boolean, ...args: unknown[]): T[] {
    return values.filter((value) => filterFunction(value, ...args));
  }
}
