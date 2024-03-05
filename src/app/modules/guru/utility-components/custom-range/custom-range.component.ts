import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-range',
  templateUrl: './custom-range.component.html',
  styleUrls: ['./custom-range.component.scss'],
})
export class CustomRangeComponent implements AfterViewInit {
  @Input() totalAmount = 400;
  @Output() rangeChange = new EventEmitter<any>();
  @ViewChild('customRange') customRange: any;
  public selectedRange = 0;
  private percentSpan: HTMLSpanElement;

  /***/
  ngAfterViewInit(): void {
    setTimeout(() => {
      const rangeShadowRoot = this.customRange.el.shadowRoot as ShadowRoot;
      const rangeActiveBar = rangeShadowRoot.querySelectorAll('.range-bar-active')[0] as HTMLDivElement;
      if (rangeActiveBar) {
        this.percentSpan = document.createElement('span');
        this.percentSpan.style.display = 'flex';
        this.percentSpan.style.justifyContent = 'center';
        this.percentSpan.style.alignItems = 'center';
        this.percentSpan.style.color = '#27242c';
        this.percentSpan.style.width = '100%';
        this.percentSpan.style.height = '100%';
        this.percentSpan.style.fontFamily = 'Lato';
        this.percentSpan.style.fontWeight = '400';
        this.percentSpan.style.fontSize = '10px';
        this.percentSpan.style.lineHeight = '160%';
        rangeActiveBar.appendChild(this.percentSpan);
      }
    }, 2000);
  }

  /**
   *
   * @param $event
   */
  public onRangeChange(event: any): void {
    this.rangeChange.emit(event.target.value);
    const percent = (event.target.value * 100) / this.totalAmount;
    if (this.percentSpan) {
      this.percentSpan.innerText = percent.toFixed(0) + '%';
    }
  }
}
