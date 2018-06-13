/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {selectMapState} from '../reducers';
import {createSelector} from '@ngrx/store';
import * as fromBaseLayer from '../reducers/base-layer.reducers';

export const selectBaseLayerState = createSelector(
  selectMapState,
  state => state.baseLayer,
);

export const selectAllBaseLayers = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectAllBaseLayers
);

export const selectBaseLayerIds = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectBaseLayerIds
);

export const selectBaseLayerEntities = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectBaseLayerEntities
);

export const selectBaseLayersTotal = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectBaseLayersTotal
);
