import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markSafe',
})
export class SafeContent implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(dirty: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(dirty);
  }
}
