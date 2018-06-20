/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ClickFormatter} from './click-formatter.util';
import {FieldFactory} from './field/field-factory.util';
import {MapClickInfo} from '@app/shared/models';

export class FieldClickFormatter implements ClickFormatter {

  html = '';

  constructor(public formatterDef: any) {
  }

  getMapClickInfo(result): MapClickInfo {
    const fields = [];
    const mapClickInfo = new MapClickInfo();
    this.formatterDef.fields.forEach((fieldDef) => {
      const field = FieldFactory.getField(fieldDef, this.formatterDef.contentType);
      if (field != null) {
        fields.push(field);
      }
    });
    mapClickInfo.fields = fields;
    mapClickInfo.result = result;
    return mapClickInfo;

  }

}
