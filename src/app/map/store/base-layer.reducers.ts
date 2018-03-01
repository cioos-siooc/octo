import {Layer} from "../../shared/layer.model";
import * as baseLayerActions from './base-layer.actions';

export interface State {
  currentBaseLayer: Layer,
  baseLayers: Layer[]
}

const initialState: State = {
  currentBaseLayer: null,
  baseLayers: []
};

export function baseLayerReducer(state = initialState, action: baseLayerActions.BaseLayerActions) : State {
  switch (action.type) {
    case baseLayerActions.ADD_BASE_LAYER:
      console.log('add state: ',state);
      console.log('add payload: ',action.payload);
      return {
        ...state,
        baseLayers: [...state.baseLayers, action.payload]
      };
    case baseLayerActions.SET_CURRENT_BASE_LAYER:
      console.log('set current state: ',state);
      console.log('set current payload: ',action.payload);
      return {
        ...state,
        currentBaseLayer: {...action.payload}
      };
    default:
      return state;
  }
}
