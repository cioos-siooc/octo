/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
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
  catalog: fromCatalog.CatalogState;
  layer: fromLayer.LayerState;
  baseLayer: fromBaseLayer.BaseLayerState;
  layerInformation: fromLayerInformation.LayerInformationState;
  popup: fromPopup.PopupState;
  layerPresentation: fromLayerPresentation.LayerPresentationState;
  mapClick: fromMapClick.MapClickState;
  behavior: fromBehavior.BehaviorState;
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
