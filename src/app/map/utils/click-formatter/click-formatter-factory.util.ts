/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

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
