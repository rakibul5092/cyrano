import { AfterViewChecked, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-text-mark',
  templateUrl: './text-mark.component.html',
  styleUrls: ['./text-mark.component.scss'],
})
export class TextMarkComponent implements AfterViewChecked {
  @Input() color: string = '';
  @Input() bold: boolean = true;

  /** */
  constructor(private _elementRef: ElementRef) {}

  /** */
  ngAfterViewChecked(): void {
    const p = this._elementRef.nativeElement.querySelector('p');
    const marks = this._elementRef.nativeElement.getElementsByTagName('mark');
    if (!p) {
      return;
    }
    let text = p.textContent;
    const tag = this.bold ? 'strong' : 'span';
    for (const mark of marks) {
      text = text.replace(mark.textContent, `<${tag} style="color: ${this.color}">$&</${tag}>`);
    }
    this._elementRef.nativeElement.innerHTML = text;
  }
}
