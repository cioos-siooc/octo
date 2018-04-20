import {MapClickInfo} from '../map-click-info.model';

export interface ClickFormatter {
  getMapClickInfo(result): MapClickInfo;
}
