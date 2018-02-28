import {Layer} from "../../shared/layer.model";
import * as layerActions from './layer.actions';

export interface State {
  layers: Layer[]
}

const initialState: State = {
  layers: [],
};

export function layerReducer(state = initialState, action: layerActions.LayerActions) {
  switch (action.type) {
    case layerActions.ADD_LAYER:
      console.log(state);
      return {
        ...state,
        layers: [...state.layers, action.payload]
      };
    default:
      return state;
  }
}

