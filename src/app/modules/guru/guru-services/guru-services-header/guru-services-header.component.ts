import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-guru-services-header',
  templateUrl: './guru-services-header.component.html',
  styleUrls: ['./guru-services-header.component.scss'],
})
export class GuruServicesHeaderComponent implements OnInit {
  @Input() enableBack: boolean;
  @Input() enableNotification: boolean = true;
  @Input() title: string;
  @Input() backTitle: string;
  @ContentChild('rightContent') rightContent: TemplateRef<ElementRef>;
  public icons: any;

  constructor(private commonUtilService: CommonUtilService, public nav: NavController) {}

  ngOnInit(): void {
    this.icons = this.commonUtilService.icons;
  }
}
