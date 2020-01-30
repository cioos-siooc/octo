/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';
import { Layer } from '@app/shared/models';

export const selectLayerState = createSelector(
  selectMapState,
  state => state.layer,
);

export const selectChildrenLayers = (id) => createSelector(
  selectLayerState,
  (layers) => {
    const childrenLayers = layers.layers.filter((l: Layer) => l.layerGroupId === id);
    return childrenLayers;
  }
);

export const selectSiblingLayer = (layerGroupId) => createSelector(
  selectLayerState,
  (layers) => {
    const siblingLayer = layers.layers.filter((l: Layer) => l.layerGroupId === layerGroupId);
    return siblingLayer;
  }
);
