import {Layer} from '../../shared/layer.model';
import * as layerActions from './layer.actions';

export interface State {
  layers: Layer[];
}

const initialState: State = {
  layers: [],
};

export function layerReducer(state = initialState, action: layerActions.LayerActions): State {
  switch (action.type) {
    case layerActions.ADD_LAYER:
      return {
        ...state,
        layers: [...state.layers, action.payload]
      };
    case layerActions.DELETE_LAYER:
      const newLayers = [...state.layers].filter((l: Layer) => {
        return l.uniqueId !== action.payload;
      });
      return {
        ...state,
        layers: newLayers
      };
    default:
      return state;
  }
}

