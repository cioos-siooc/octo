import {ClickFormatter} from './click-formatter.util';

export class JsonClickFormatter implements ClickFormatter {
  format(result) {
    return JSON.stringify(result.result);
  }
}
