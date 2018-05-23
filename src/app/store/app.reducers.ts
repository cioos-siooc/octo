import {ActionReducerMap, MetaReducer, createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromCatalog from '../map/components/catalog/store/catalog.reducers';
import * as fromLayerInformation from '../map/components/layer-information/store/layer-information.reducers';
import * as fromBaseLayer from '../map/store/reducers/base-layer.reducers';
import * as fromLayer from '../map/store/reducers/layer.reducers';
import * as fromPopup from '../map/store/reducers/popup.reducers';
import * as fromLayerPresentation from '../map/components/layer-presentation/store/layer-presentation.reducers';
import * as fromMapClick from '../map/components/map-click/store/map-click.reducers';
import * as fromBehavior from '../map/components/layer-manager/store/behavior.reducers';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';

export interface AppState {
  catalog: fromCatalog.State;
  layer: fromLayer.State;
  baseLayer: fromBaseLayer.State;
  layerInformation: fromLayerInformation.State;
  popup: fromPopup.State;
  layerPresentation: fromLayerPresentation.State;
  mapClick: fromMapClick.State;
  behavior: fromBehavior.State;
}

export const reducers: ActionReducerMap<AppState> = {
  catalog: fromCatalog.catalogReducer,
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer,
  layerInformation: fromLayerInformation.layerInformationReducer,
  popup: fromPopup.popupReducer,
  layerPresentation: fromLayerPresentation.layerPresentationReducer,
  mapClick: fromMapClick.mapClickReducer,
  behavior: fromBehavior.behaviorReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

export const selectBaseLayerState = createFeatureSelector<fromBaseLayer.State>('baseLayer');

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

