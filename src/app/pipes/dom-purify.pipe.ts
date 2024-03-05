import { Pipe, PipeTransform } from '@angular/core';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'dompurify',
})
export class DomPurifyPipe implements PipeTransform {
  transform(dirty: string): string {
    return DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
  }
}
