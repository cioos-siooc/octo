import {WmsHtmlEmpty} from './wms-html-empty.util';
import {EmptyValidator} from './empty-validator.util';

export class EmptyValidatorFactory {
  public static getEmptyValidator(validatorCode): EmptyValidator {
    if (validatorCode === 'wms-html') {
      return new WmsHtmlEmpty();
    }
    return null;
  }
}
