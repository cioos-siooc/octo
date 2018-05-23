import {Layer} from '../../../shared/layer.model';
import {cloneDeep} from 'lodash';
import {LayerActionsUnion, LayerActionTypes} from '../actions/layer.actions';

export interface State {
  layers: Layer[];
}

export const initialState: State = {
  layers: [],
};

export function layerReducer(state = initialState, action: LayerActionsUnion): State {
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
    case LayerActionTypes.SET_CLIENT_PRESENTATION:
      const newState = cloneDeep(state);
      const layerInd = newState.layers.findIndex((l) => l.uniqueId === (<any>action.payload).uniqueId);
      if (layerInd > -1) {
        newState.layers[layerInd].currentClientPresentation = (cloneDeep(action.payload)).clientPresentation;
      }
      return newState;
    default:
      return state;
  }
}

