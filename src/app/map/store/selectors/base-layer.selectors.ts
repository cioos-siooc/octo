import {selectMapState} from '../reducers/map.reducers';
import {createSelector} from '@ngrx/store';
import * as fromBaseLayer from '../reducers/base-layer.reducers';

export const selectBaseLayerState = createSelector(
  selectMapState,
  state => state.baseLayer,
);

export const selectAllBaseLayers = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectAllBaseLayers
);

export const selectBaseLayerIds = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectBaseLayerIds
);

export const selectBaseLayerEntities = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectBaseLayerEntities
);

export const selectBaseLayersTotal = createSelector(
  selectBaseLayerState,
  fromBaseLayer.selectBaseLayersTotal
);
