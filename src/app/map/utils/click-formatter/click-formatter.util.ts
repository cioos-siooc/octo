import {MapClickInfo} from '../../../shared/models/map-click-info.model';

export interface ClickFormatter {
  getMapClickInfo(result): MapClickInfo;
}
