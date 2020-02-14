/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {uniqueId} from 'lodash';

import * as layerActions from '../store/actions/layer.actions';

export default class ActivateLayer {
  static activateLayer(layerId: number, store) {
    const genUniqueId: string = uniqueId();
    store.dispatch(new layerActions.FetchLayer({
      layerId: layerId,
    }));
    return genUniqueId;
  }
}
