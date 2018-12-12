/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {MapClickInfo} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {MapClickActionsUnion, MapClickActionTypes} from '../actions/map-click.actions';

export interface MapClickState {
  mapClickInfo: MapClickInfo[];
}

export const initialState: MapClickState = {
  mapClickInfo: []
};

export function mapClickReducer(state = initialState, action: MapClickActionsUnion): MapClickState {
  switch (action.type) {
    case MapClickActionTypes.SET_MAP_CLICK_INFO: {
      const mapClickInfo = [...state.mapClickInfo];
      mapClickInfo[action.payload.layerId] = action.payload.mapClickInfo;
      return {
        ...state,
        mapClickInfo: mapClickInfo
      };
    }
    case MapClickActionTypes.CLEAR_MAP_CLICK_INFO: {
      const mapClickInfo = [...state.mapClickInfo];
      mapClickInfo[action.payload] = null;
      return {
        ...state,
        mapClickInfo: mapClickInfo
      };
    }
    default:
      return state;
  }
}
