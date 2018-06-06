import {Layer} from '../../../shared/models/layer.model';
import {cloneDeep} from 'lodash';
import {MapClickInfo} from '../../../shared/models/map-click-info.model';
import {MapClickActionsUnion, MapClickActionTypes} from '../actions/map-click.actions';

export interface MapClickState {
  mapClickInfo: MapClickInfo;
  mapClickLayer: Layer;
}

export const initialState: MapClickState = {
  mapClickInfo: null,
  mapClickLayer: null
};

export function mapClickReducer(state = initialState, action: MapClickActionsUnion): MapClickState {
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
