/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {PropertyLocator} from './property-locator.util';

export class ObjectPropertyLocator implements PropertyLocator {
  getValue(obj: any, path: any): any {
    if (!path) {
      return null;
    }
    const separator = '/';
    let i, len;

    for (i = 0, path = path.split(separator), len = path.length; i < len; i++) {
      if (!obj || typeof obj !== 'object') {
        return null;
      }
      obj = obj[path[i]];
    }

    if (obj === undefined) {
      return null;
    }
    return obj;
  }
}
