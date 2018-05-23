import {ClickFormatter} from './click-formatter.util';
import {MapClickInfo} from '../../../shared/map-click-info.model';

export class WmsTextClickFormatter implements ClickFormatter {
  getMapClickInfo(result): MapClickInfo {
    const html = result.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    const mapClickInfo = new MapClickInfo();
    mapClickInfo.html = html;

    return mapClickInfo;
  }
}
