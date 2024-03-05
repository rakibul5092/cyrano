import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectableItemService {
  private itemSource = new Subject<{}>();
  currentItem = this.itemSource.asObservable();

  emitItem(item: any) {
    this.itemSource.next(item);
  }
}
