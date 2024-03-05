import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SelectableItemService } from './selectableitem.service';

@Component({
  selector: 'app-selectable-item',
  templateUrl: './selectable-item.component.html',
  styleUrls: ['./selectable-item.component.scss'],
})
export class SelectableItemComponent {
  @Input() label1: string;
  @Input() label2: string;
  @Input() item: any;
  public mouseover: boolean = false;

  constructor(private navController: NavController, private selectService: SelectableItemService, private changeDetectorRef: ChangeDetectorRef) {}

  public editBtnClicked(): void {
    this.selectService.emitItem({ item: this.item });
  }

  public mouseOnItem(state: boolean = false): void {
    this.mouseover = state;
  }
}
