/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Layer} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {LayerActionsUnion, LayerActionTypes} from '../actions/layer.actions';

export interface LayerState {
  layers: Layer[];
}

export const initialState: LayerState = {
  layers: [],
};

export function layerReducer(state = initialState, action: LayerActionsUnion): LayerState {
  switch (action.type) {
    case LayerActionTypes.ADD_LAYER:
      const clonedState = cloneDeep(state);
      clonedState.layers.push(cloneDeep(action.payload));
      return clonedState;
    case LayerActionTypes.DELETE_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.layers = cloneState.layers.filter((l: Layer) => {
        return l.uniqueId !== action.payload;
      });
      return cloneState;
    case LayerActionTypes.UPDATE_LAYER:
      const clownState = cloneDeep(state);
      const layerIndex = clownState.layers.findIndex((l) => l.uniqueId === (<any>action.payload).uniqueId);
      if (layerIndex > -1) {
        clownState.layers[layerIndex] = cloneDeep(action.payload);
      }
      return clownState;
    case LayerActionTypes.MOVE_UP_LAYER:
      const cState = cloneDeep(state);
      const layerIdx = cState.layers.findIndex((l) => l.uniqueId === action.payload);
      if (layerIdx !== cState.layers.length - 1) {
        const temp = cState.layers[layerIdx];
        cState.layers[layerIdx] = cState.layers[layerIdx + 1];
        cState.layers[layerIdx + 1] = temp;
      }
      return cState;
    case LayerActionTypes.MOVE_DOWN_LAYER:
      const clState = cloneDeep(state);
      const layerId = clState.layers.findIndex((l) => l.uniqueId === action.payload);
      if (layerId !== 0) {
        const temp = clState.layers[layerId];
        clState.layers[layerId] = clState.layers[layerId - 1];
        clState.layers[layerId - 1] = temp;
      }
      return clState;
    case LayerActionTypes.SET_LAYER_DESCRIPTION:
      const layer: Layer = {
        ...state.layers[action.payload.layerId],
        description: action.payload.layerDescription
      };
      const layers: Layer[] = [...state.layers];
      layers[action.payload.layerId] = layer;
      return {
        ...state,
        layers: layers
      };
    case LayerActionTypes.SET_CLIENT_PRESENTATION:
      const newState = cloneDeep(state);
      const layerInd = newState.layers.findIndex((l) => l.uniqueId === (<any>action.payload).uniqueId);
      if (layerInd > -1) {
        newState.layers[layerInd].currentClientPresentation = (cloneDeep(action.payload)).clientPresentation;
      }
      return newState;
    case LayerActionTypes.SET_LAYER_POSITION:
      const originalIndex = state.layers.findIndex((l: Layer) => l.uniqueId === action.payload.layerId);
      const layerPriority = state.layers[originalIndex].priority;

      const newLayers = state.layers.map((l) => {
        // If the layer currently being inspected is the layer to be moved, set the ID and return
        if (l.uniqueId === action.payload.layerId) {
          return {
            ...l,
            priority: action.payload.newLayerPosition
          };
        }

        // If the layer being moved is coming from outside of the valid priority range(this is the case for new layers)
        // Increment all of the other layer priorities by 1
        if (layerPriority < 0) {
          return {
            ...l,
            priority: l.priority + 1
          };
        }

        // Otherwise we may have to move the layer
        if (action.payload.newLayerPosition < layerPriority) {
          if ((l.priority < layerPriority) && (l.priority >= action.payload.newLayerPosition)) {
            return {
              ...l,
              priority: l.priority + 1
            };
          }
        } else if (action.payload.newLayerPosition > layerPriority) {
          if ((l.priority > layerPriority) && (l.priority <= action.payload.newLayerPosition)) {
            return {
              ...l,
              priority: l.priority - 1
            };
          }
        }
        return l;
      });
      return {
        ...state,
        layers: newLayers
      };
    default:
      return state;
  }
}

