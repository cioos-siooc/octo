import {Layer} from '../../shared/layer.model';
import * as baseLayerActions from './base-layer.actions';
import {cloneDeep} from 'lodash';

export interface State {
  currentBaseLayer: Layer;
  baseLayers: Layer[];
}

const initialState: State = {
  currentBaseLayer: null,
  baseLayers: []
};

export function baseLayerReducer(state = initialState, action: baseLayerActions.BaseLayerActions) {
  switch (action.type) {
    case baseLayerActions.ADD_BASE_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.baseLayers.push(cloneDeep(action.payload));
      return cloneState;
    case baseLayerActions.SET_CURRENT_BASE_LAYER:
      const clonedState = cloneDeep(state);
      clonedState.currentBaseLayer = cloneDeep(action.payload);
      return clonedState;
    default:
      return state;
  }
}
