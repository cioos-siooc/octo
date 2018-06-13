/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Layer} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {MapClickInfo} from '@app/shared/models';
import {MapClickActionsUnion, MapClickActionTypes} from '../actions/map-click.actions';

export interface MapClickState {
  mapClickInfo: MapClickInfo;
  mapClickLayer: Layer;
}

export const initialState: MapClickState = {
  mapClickInfo: null,
  mapClickLayer: null
};

export function mapClickReducer(state = initialState, action: MapClickActionsUnion): MapClickState {
  switch (action.type) {
    case MapClickActionTypes.SET_MAP_CLICK_INFO:
      const clonedState = cloneDeep(state);
      clonedState.mapClickInfo = cloneDeep(action.payload);
      return clonedState;
    case MapClickActionTypes.SET_MAP_CLICK_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.mapClickLayer = cloneDeep(action.payload);
      return cloneState;
    default:
      return state;
  }
}
