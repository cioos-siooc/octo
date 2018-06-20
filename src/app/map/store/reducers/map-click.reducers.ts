/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {MapClickInfo} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {MapClickActionsUnion, MapClickActionTypes} from '../actions/map-click.actions';

export interface MapClickState {
  mapClickInfo: MapClickInfo;
  mapClickLayerUniqueId: string;
}

export const initialState: MapClickState = {
  mapClickInfo: null,
  mapClickLayerUniqueId: null
};

export function mapClickReducer(state = initialState, action: MapClickActionsUnion): MapClickState {
  switch (action.type) {
    case MapClickActionTypes.SET_MAP_CLICK_INFO:
      const clonedState = cloneDeep(state);
      clonedState.mapClickInfo = cloneDeep(action.payload);
      return clonedState;
    case MapClickActionTypes.SET_MAP_CLICK_LAYER_UNIQUE_ID:
      const cloneState = cloneDeep(state);
      cloneState.mapClickLayerUniqueId = cloneDeep(action.payload);
      return cloneState;
    default:
      return state;
  }
}
