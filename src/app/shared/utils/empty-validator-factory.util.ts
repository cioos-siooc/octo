/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

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
