import {MapClickInfo} from '../../../shared/map-click-info.model';

export interface ClickFormatter {
  getMapClickInfo(result): MapClickInfo;
}
