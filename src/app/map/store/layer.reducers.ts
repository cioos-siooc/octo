import {Layer} from '../../shared/layer.model';
import * as layerActions from './layer.actions';
import {cloneDeep} from 'lodash';

export interface State {
  layers: Layer[];
}

const initialState: State = {
  layers: [],
};

export function layerReducer(state = initialState, action: layerActions.LayerActions): State {
  switch (action.type) {
    case layerActions.ADD_LAYER:
      const clonedState = cloneDeep(state);
      clonedState.layers.push(action.payload);
      return clonedState;
    case layerActions.DELETE_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.layers = cloneState.layers.filter((l: Layer) => {
        return l.uniqueId !== action.payload;
      });
      return cloneState;
    case layerActions.UPDATE_LAYER:
      const clownState = cloneDeep(state);
      const layerIndex = clownState.layers.findIndex((l) => l.uniqueId === action.payload.uniqueId);
      if (layerIndex > -1) {
        clownState.layers[layerIndex] = action.payload;
      }
      return clownState;
    default:
      return state;
  }
}

