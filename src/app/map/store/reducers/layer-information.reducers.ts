/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {LayerInformationActionsUnion, LayerInformationActionTypes} from '../actions/layer-information.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LayerInformation } from '@app/shared/models';

export interface LayerInformationState extends EntityState<LayerInformation> { }

export const adapter: EntityAdapter<LayerInformation> = createEntityAdapter<LayerInformation>({
  selectId: (layerInformation: LayerInformation) => layerInformation.layerId.toString(),
  sortComparer: false 
});

export function layerInformationReducer(state = adapter.getInitialState(), action: LayerInformationActionsUnion): LayerInformationState {
  switch (action.type) {
    case LayerInformationActionTypes.SET_LAYER_INFORMATION:
      const id: Number = action.payload.layerId;
      const ids: Number[] = state.ids as Array<number>;
      if (ids.includes(id)) {
        state = adapter.removeOne(id.toString(), state);
      }
      return adapter.addOne({ ...action.payload }, state);
    default:
      return state;
  }
}

export const {
  selectIds: selectLayerInformationIds,
  selectEntities: selectLayerInformationEntities,
  selectAll: selectAllLayerInformation,
  selectTotal: selectLayerInformationTotal
} = adapter.getSelectors();
