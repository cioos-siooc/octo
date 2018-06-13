/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ClickFormatter} from './click-formatter.util';
import {MapClickInfo} from '@app/shared/models';

export class WmsTextClickFormatter implements ClickFormatter {
  getMapClickInfo(result): MapClickInfo {
    const html = result.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    const mapClickInfo = new MapClickInfo();
    mapClickInfo.html = html;

    return mapClickInfo;
  }
}
