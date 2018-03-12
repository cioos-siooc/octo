import * as fromCatalog from '../catalog/store/catalog.reducers';
import {ActionReducerMap} from '@ngrx/store';
import * as  fromLayer from '../map/store/layer.reducers';
import * as  fromBaseLayer from '../map/store/base-layer.reducers';

export interface AppState {
  catalog: fromCatalog.State;
  layer: fromLayer.State;
  baseLayer: fromBaseLayer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  catalog: fromCatalog.catalogReducer,
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer
};
