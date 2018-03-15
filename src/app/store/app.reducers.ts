import { ActionReducerMap } from '@ngrx/store';

import * as fromCatalog from '../catalog/store/catalog.reducers';
import * as fromLayerInformation from '../layer-information/store/layer-information.reducers';
import * as fromBaseLayer from '../map/store/base-layer.reducers';
import * as fromLayer from '../map/store/layer.reducers';

export interface AppState {
  catalog: fromCatalog.State;
  layer: fromLayer.State;
  baseLayer: fromBaseLayer.State;
  layerInformation: fromLayerInformation.State;
}

export const reducers: ActionReducerMap<AppState> = {
  catalog: fromCatalog.catalogReducer,
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer,
  layerInformation: fromLayerInformation.layerInformationReducer
};
