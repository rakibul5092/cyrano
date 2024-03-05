import { PositionModel } from 'src/app/modules/shared/components/map/models/position.model';
import { ClientModel } from './client.model';

export interface DateRequestModel {
  id: string;
  client: ClientModel;
  position: PositionModel;
}
