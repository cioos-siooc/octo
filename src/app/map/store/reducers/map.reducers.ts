import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';

import * as fromCatalog from './catalog.reducers';
import * as fromLayerInformation from './/layer-information.reducers';
import * as fromBaseLayer from './base-layer.reducers';
import * as fromLayer from './layer.reducers';
import * as fromPopup from './popup.reducers';
import * as fromLayerPresentation from './layer-presentation.reducers';
import * as fromMapClick from './map-click.reducers';
import * as fromBehavior from './behavior.reducers';

export interface MapState {
  catalog: fromCatalog.State;
  layer: fromLayer.State;
  baseLayer: fromBaseLayer.State;
  layerInformation: fromLayerInformation.State;
  popup: fromPopup.State;
  layerPresentation: fromLayerPresentation.State;
  mapClick: fromMapClick.State;
  behavior: fromBehavior.State;
}

export const mapReducers: ActionReducerMap<MapState> = {
  catalog: fromCatalog.catalogReducer,
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer,
  layerInformation: fromLayerInformation.layerInformationReducer,
  popup: fromPopup.popupReducer,
  layerPresentation: fromLayerPresentation.layerPresentationReducer,
  mapClick: fromMapClick.mapClickReducer,
  behavior: fromBehavior.behaviorReducer
};

export const metaReducers: MetaReducer<MapState>[] = !environment.production ? [storeFreeze] : [];

// TODO: put map inside a constant?
export const selectMapState = createFeatureSelector<MapState>(
  'map'
);

export const selectCatalogState = createSelector(
  selectMapState,
  state => state.catalog,
);
export const selectLayerState = createSelector(
  selectMapState,
  state => state.layer,
);
export const selectBaseLayerState = createSelector(
  selectMapState,
  state => state.baseLayer,
);
export const selectLayerInformationState = createSelector(
  selectMapState,
  state => state.layerInformation,
);
export const selectPopupState = createSelector(
  selectMapState,
  state => state.popup,
);
export const selectLayerPresentationState = createSelector(
  selectMapState,
  state => state.layerPresentation,
);
export const selectMapClickState = createSelector(
  selectMapState,
  state => state.mapClick,
);
export const selectBehaviorState = createSelector(
  selectMapState,
  state => state.behavior,
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
