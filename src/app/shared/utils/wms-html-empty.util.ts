/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {EmptyValidator} from './empty-validator.util';

export class WmsHtmlEmpty implements EmptyValidator {
  isPayloadEmpty(result) {
    const insideBodyTags = result.substring(result.indexOf('<body>') + 6, result.indexOf('</body>'));
    const trimmed = insideBodyTags.replace(/ /g, '').replace(/\r?\n|\r/g, '');
    return (trimmed.length <= 0);
  }
}
