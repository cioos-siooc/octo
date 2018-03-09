import {Layer} from '../../shared/layer.model';
import * as baseLayerActions from './base-layer.actions';

export interface State {
  currentBaseLayer: Layer;
  baseLayers: Layer[];
}

const initialState: State = {
  currentBaseLayer: null,
  baseLayers: []
};

export function baseLayerReducer(state = initialState, action: baseLayerActions.BaseLayerActions): State {
  switch (action.type) {
    case baseLayerActions.ADD_BASE_LAYER:
      return {
        ...state,
        baseLayers: [...state.baseLayers, action.payload]
      };
    case baseLayerActions.SET_CURRENT_BASE_LAYER:
      return {
        ...state,
        currentBaseLayer: {...action.payload}
      };
    default:
      return state;
  }
}
