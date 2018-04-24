import * as mapClickActions from './map-click.actions';
import {Layer} from '../../shared/layer.model';
import {cloneDeep} from 'lodash';
import {MapClickInfo} from '../../shared/map-click-info.model';

export interface State {
  mapClickInfo: MapClickInfo;
  mapClickLayer: Layer;
}

const initialState: State = {
  mapClickInfo: null,
  mapClickLayer: null
};

export function mapClickReducer(state = initialState, action: mapClickActions.MapClickActions) {
  switch (action.type) {
    case mapClickActions.SET_MAP_CLICK_INFO:
      const clonedState = cloneDeep(state);
      clonedState.mapClickInfo = action.payload;
      return clonedState;
    case mapClickActions.SET_MAP_CLICK_LAYER:
      const cloneState = cloneDeep(state);
      cloneState.mapClickLayer = action.payload;
      return cloneState;
    default:
      return state;
  }
}
