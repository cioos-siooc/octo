import {Layer} from '../../shared/layer.model';
import {cloneDeep} from 'lodash';
import {MapClickInfo} from '../../shared/map-click-info.model';
import {MapClickActionsUnion, MapClickActionTypes} from './map-click.actions';

export interface State {
  mapClickInfo: MapClickInfo;
  mapClickLayer: Layer;
}

export const initialState: State = {
  mapClickInfo: null,
  mapClickLayer: null
};

export function mapClickReducer(state = initialState, action: MapClickActionsUnion): State {
  switch (action.type) {
    case MapClickActionTypes.SET_MAP_CLICK_INFO:
      const clonedState = cloneDeep(state);
      clonedState.mapClickInfo = cloneDeep(action.payload);
      return clonedState;
    case MapClickActionTypes.SET_MAP_CLICK_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.mapClickLayer = cloneDeep(action.payload);
      return cloneState;
    default:
      return state;
  }
}
