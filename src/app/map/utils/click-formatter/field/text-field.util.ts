/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Field} from './field.util';


export class TextField implements Field {
  type: string;

  constructor(public fieldDef: any, public contentType: string) {
    this.type = this.fieldDef.type;
  }
}
