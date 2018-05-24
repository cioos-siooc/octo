import {ClickFormatter} from './click-formatter.util';
import {WmsTextClickFormatter} from './wms-text-click-formatter.util';
import {FieldClickFormatter} from './field-click-formatter.util';


export class ClickFormatterFactory {
  public static getClickFormatter(type: string, formatterDef?: any): ClickFormatter {
    switch (type) {
      case 'wms-text':
        return new WmsTextClickFormatter();
      case 'field':
        return new FieldClickFormatter(formatterDef);
      default:
        return null;
    }
  }
}
