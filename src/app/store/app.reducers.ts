import { ActionReducerMap } from '@ngrx/store';

import * as fromCatalog from '../catalog/store/catalog.reducers';
import * as fromLayerInformation from '../layer-information/store/layer-information.reducers';
import * as fromBaseLayer from '../map/store/base-layer.reducers';
import * as fromLayer from '../map/store/layer.reducers';
import * as fromPopup from '../map/store/popup.reducers';

export interface AppState {
  catalog: fromCatalog.State;
  layer: fromLayer.State;
  baseLayer: fromBaseLayer.State;
  layerInformation: fromLayerInformation.State;
  popup: fromPopup.State;
}

export const reducers: ActionReducerMap<AppState> = {
  catalog: fromCatalog.catalogReducer,
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer,
  layerInformation: fromLayerInformation.layerInformationReducer,
  popup: fromPopup.popupReducer
};
