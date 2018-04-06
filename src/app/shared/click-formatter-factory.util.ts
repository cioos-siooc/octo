import {ClickFormatter} from './click-formatter.util';
import {JsonClickFormatter} from './json-click-formatter.util';


export class ClickFormatterFactory {
  public static getClickFormatter(formatterCode: string): ClickFormatter {
    if (formatterCode === 'json') {
      return new JsonClickFormatter();
    }
    return null;
  }
}
