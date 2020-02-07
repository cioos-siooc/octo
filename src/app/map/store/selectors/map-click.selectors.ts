import { selectSiblingLayer } from './layer.selectors';
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';
import * as fromMapClick from '../reducers/map-click.reducers';

export const selectMapClickState = createSelector(
  selectMapState,
  state => state.mapClick,
);

export const selectAllMapClickResults = createSelector(
  selectMapClickState,
  fromMapClick.selectAllMapClicks,
);

export const selectMapClickIds = createSelector(
  selectMapClickState,
  fromMapClick.selectMapClickIds
);

export const selectMapClickEntities = createSelector(
  selectMapClickState,
  fromMapClick.selectMapClickEntities
);

export const selectMapClickTotal = createSelector(
  selectMapClickState,
  fromMapClick.selectMapClickTotal
);

export const selectMapClickByLayerId = (layerId) => createSelector(
  selectMapClickEntities,
  (mapClicks) => {
    if (mapClicks) {
      return mapClicks[layerId];
    } else {
      return {};
    }
  }
);

export const selectSiblingMapClick = (layer) => createSelector(
  selectSiblingLayer(layer),
  selectMapClickEntities,
  (siblingLayer, mapClickEntities) => {
    if (mapClickEntities) {
      return mapClickEntities[siblingLayer.id];
    } else {
      return {};
    }
  }
);
