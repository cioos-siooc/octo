import {ClickFormatter} from './click-formatter.util';

export class WmsTextClickFormatter implements ClickFormatter {
  format(result) {
    return result.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  }
}
