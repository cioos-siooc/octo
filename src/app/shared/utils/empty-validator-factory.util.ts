import {WmsHtmlEmpty} from './wms-html-empty.util';
import {EmptyValidator} from './empty-validator.util';
import {WmsTextEmpty} from './wms-text-empty.util';

export class EmptyValidatorFactory {
  public static getEmptyValidator(validatorCode: string): EmptyValidator {
    switch (validatorCode) {
      case 'wms-html':
        return new WmsHtmlEmpty();
      case 'wms-text':
        return new WmsTextEmpty();
      default:
        return null;
    }
  }
}
