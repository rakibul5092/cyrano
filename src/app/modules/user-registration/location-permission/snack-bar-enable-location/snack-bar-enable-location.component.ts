import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snack-bar-enable-location.component.html',
})
export class SnackbarComponentEnableLocation {
  private mouseHover: boolean = false;
  private timeoutFunction: ReturnType<typeof setTimeout> = null;

  constructor(public snackBarRef: MatSnackBarRef<SnackbarComponentEnableLocation>) {
    this.mouseHover = true;
    this.onMouseLeave();
  }
  public onMouseEnter(): void {
    this.mouseHover = true;
    if (this.timeoutFunction) clearTimeout(this.timeoutFunction);
  }
  public onMouseLeave(): void {
    if (this.mouseHover) {
      this.timeoutFunction = setTimeout(() => {
        this.mouseHover = false;
        if (!this.mouseHover) if (this.snackBarRef) this.snackBarRef.dismiss();
      }, 2000);
    }
  }
  public close(): void {
    this.snackBarRef.dismiss();
  }
}
