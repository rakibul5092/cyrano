import { Component, OnInit } from '@angular/core';
import { GuruItinerariesService } from './guru-itineraries.service';
import { ItinerariesModel } from '../../../../models/itineraries.model';
import { CommonUtilService } from '../../../../services/common-utils.service';
import { ICONS } from '../../../../theme/theme.icons';

@Component({
  selector: 'app-guru-itineraries',
  templateUrl: './guru-itineraries.component.html',
  styleUrls: ['./guru-itineraries.component.scss'],
})
export class GuruItinerariesComponent implements OnInit {
  public itineraries: ItinerariesModel[] = [];
  public icons: any;
  public commonIcons = ICONS.commonIcons;

  constructor(private guruItinerariesService: GuruItinerariesService, private commonUtilService: CommonUtilService) {}

  ngOnInit(): void {
    this.itineraries = this.guruItinerariesService.getItineraries();
    this.icons = this.commonUtilService.icons;
  }
}
