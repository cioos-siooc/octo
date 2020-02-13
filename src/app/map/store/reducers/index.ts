/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';

import * as fromLayerInformation from './layer-information.reducers';
import * as fromBaseLayer from './base-layer.reducers';
import * as fromLayer from './layer.reducers';
import * as fromPopup from './popup.reducers';
import * as fromMapClick from './map-click.reducers';
import * as fromBehavior from './behavior.reducers';
import * as fromTopic from './topic.reducers';
import * as fromCategory from './category.reducers';

export interface MapState {
  layer: fromLayer.LayerState;
  baseLayer: fromBaseLayer.BaseLayerState;
  layerInformation: fromLayerInformation.LayerInformationState;
  popup: fromPopup.PopupState;
  mapClick: fromMapClick.MapClickState;
  behavior: fromBehavior.BehaviorState;
  topic: fromTopic.TopicState;
  category: fromCategory.CategoryState;
}

export interface StoreState {
  map: MapState;
}

export const mapReducers: ActionReducerMap<MapState> = {
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer,
  layerInformation: fromLayerInformation.layerInformationReducer,
  popup: fromPopup.popupReducer,
  mapClick: fromMapClick.mapClickReducer,
  behavior: fromBehavior.behaviorReducer,
  topic: fromTopic.topicReducer,
  category: fromCategory.categoryReducer,
};

export const metaReducers: MetaReducer<MapState>[] = !environment.production ? [storeFreeze] : [];

// TODO: put map inside a constant?
export const selectMapState = createFeatureSelector<MapState>(
  'map'
);
