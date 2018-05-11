import {Layer} from '../../shared/layer.model';
import {cloneDeep} from 'lodash';
import {BaseLayerActionsUnion, BaseLayerActionTypes} from './base-layer.actions';

export interface State {
  currentBaseLayer: Layer;
  baseLayers: Layer[];
}

export const initialState: State = {
  currentBaseLayer: null,
  baseLayers: []
};

export function baseLayerReducer(state = initialState, action: BaseLayerActionsUnion): State {
  switch (action.type) {
    case BaseLayerActionTypes.ADD_BASE_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.baseLayers.push(cloneDeep(action.payload));
      return cloneState;
    case BaseLayerActionTypes.SET_CURRENT_BASE_LAYER:
      const clonedState = cloneDeep(state);
      clonedState.currentBaseLayer = cloneDeep(action.payload);
      return clonedState;
    default:
      return state;
  }
}
