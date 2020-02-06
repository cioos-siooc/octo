/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';
import * as fromLayerInformation from '../reducers/layer-information.reducers';

export const selectLayerInformationState = createSelector(
  selectMapState,
  state => state.layerInformation,
);

export const selectAllLayerInformationResults = createSelector(
  selectLayerInformationState,
  fromLayerInformation.selectLayerInformationIds
);

export const selectLayerInformationIds = createSelector(
  selectLayerInformationState,
  fromLayerInformation.selectLayerInformationIds
);

export const selectLayerInformationEntities = createSelector(
  selectLayerInformationState,
  fromLayerInformation.selectLayerInformationEntities
);

export const selectLayerInformationTotal = createSelector(
  selectLayerInformationState,
  fromLayerInformation.selectLayerInformationTotal
);

export const selectLayerInformationByLayerId = createSelector(
  selectLayerInformationEntities,
  (layerInformation, props) => {
    if (layerInformation) {
      return layerInformation[props.id]
    } else {
      return {};
    }
  }
)