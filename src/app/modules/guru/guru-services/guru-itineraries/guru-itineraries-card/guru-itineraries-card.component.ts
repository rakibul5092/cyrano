import { Component, Input } from '@angular/core';
import { ItinerariesModel } from '../../../../../models/itineraries.model';
import { CommonUtilService } from '../../../../../services/common-utils.service';

@Component({
  selector: 'app-guru-itineraries-card',
  templateUrl: './guru-itineraries-card.component.html',
  styleUrls: ['./guru-itineraries-card.component.scss'],
})
export class GuruItinerariesCardComponent {
  @Input() itinerary: ItinerariesModel;
  public icons: any = this.commonUtilService.icons;

  constructor(private commonUtilService: CommonUtilService) {}
}
