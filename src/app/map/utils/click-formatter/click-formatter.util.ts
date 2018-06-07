import {MapClickInfo} from '@app/shared/models';

export interface ClickFormatter {
  getMapClickInfo(result): MapClickInfo;
}
