/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';

export const selectLayerState = createSelector(
  selectMapState,
  state => state.layer,
);

export const selectLayerById = (id) => createSelector(
  selectLayerState,
  layerState => {
    const matchingLayers = layerState.layers.filter(l => l.id === id);
    if (matchingLayers.length > 0) {
      return matchingLayers[0];
    } else {
      return null;
    }
  }
)
