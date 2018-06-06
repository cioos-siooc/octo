import {Layer} from '@app/shared/models';
import {cloneDeep} from 'lodash';
import {BaseLayerActionsUnion, BaseLayerActionTypes} from '../actions/base-layer.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface BaseLayerState extends EntityState<Layer> {
  currentBaseLayer: Layer;
}

export const adapter: EntityAdapter<Layer> = createEntityAdapter<Layer>({
  selectId: (layer: Layer) => layer.id,
  sortComparer: false,
});

export const initialState: BaseLayerState = adapter.getInitialState({
  currentBaseLayer: null,
});

export function baseLayerReducer(state = initialState, action: BaseLayerActionsUnion): BaseLayerState {
  switch (action.type) {
    case BaseLayerActionTypes.ADD_BASE_LAYER:
      return adapter.addOne(action.payload, state);
    case BaseLayerActionTypes.SET_CURRENT_BASE_LAYER:
      const clonedState = cloneDeep(state);
      clonedState.currentBaseLayer = cloneDeep(action.payload);
      return clonedState;
    default:
      return state;
  }
}

export const {
  selectIds: selectBaseLayerIds,
  selectEntities: selectBaseLayerEntities,
  selectAll: selectAllBaseLayers,
  selectTotal: selectBaseLayersTotal,
} = adapter.getSelectors();
