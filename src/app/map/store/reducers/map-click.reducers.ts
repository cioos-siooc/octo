/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { MapClickInfo } from '@app/shared/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MapClickActionsUnion, MapClickActionTypes } from '../actions/map-click.actions';

/**
 * Stores a set of key:value pairs representing MapClick data for layers in the application
 *  Uses an EntityState reducer 
 *
 * @export
 * @interface MapClickState
 * @extends {EntityState<MapClickInfo>}
 */
export interface MapClickState extends EntityState<MapClickInfo> { }

export const adapter: EntityAdapter<MapClickInfo> = createEntityAdapter<MapClickInfo>({
  selectId: (mapClickInfo: MapClickInfo) => mapClickInfo.layerId,
  sortComparer: false
});

export function mapClickReducer(state = adapter.getInitialState(), action: MapClickActionsUnion): MapClickState {
  switch (action.type) {
    case MapClickActionTypes.SET_MAP_CLICK_INFO:
      const id: number = action.payload.layerId;
      const ids: number[] = state.ids as Array<number>;
      if (ids.includes(id)) {
        state = adapter.removeOne(id, state);
      }
      return adapter.addOne({ ...action.payload }, state);
    case MapClickActionTypes.CLEAR_MAP_CLICK_INFO:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}

export const {
  selectIds: selectMapClickIds,
  selectEntities: selectMapClickEntities,
  selectAll: selectAllMapClicks,
  selectTotal: selectMapClickTotal,
} = adapter.getSelectors();
