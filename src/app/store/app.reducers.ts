import { ActionReducerMap } from '@ngrx/store';

import * as fromCatalog from '../catalog/store/catalog.reducers';
import * as fromLayerInformation from '../layer-information/store/layer-information.reducers';
import * as fromBaseLayer from '../map/store/base-layer.reducers';
import * as fromLayer from '../map/store/layer.reducers';
import * as fromPopup from '../map/store/popup.reducers';
import * as fromLayerPresentation from '../layer-presentation/store/layer-presentation.reducers';
import * as fromMapClick from '../map-click/store/map-click.reducers';

export interface AppState {
  catalog: fromCatalog.State;
  layer: fromLayer.State;
  baseLayer: fromBaseLayer.State;
  layerInformation: fromLayerInformation.State;
  popup: fromPopup.State;
  layerPresentation: fromLayerPresentation.State;
  mapClick: fromMapClick.State;
}

export const reducers: ActionReducerMap<AppState> = {
  catalog: fromCatalog.catalogReducer,
  layer: fromLayer.layerReducer,
  baseLayer: fromBaseLayer.baseLayerReducer,
  layerInformation: fromLayerInformation.layerInformationReducer,
  popup: fromPopup.popupReducer,
  layerPresentation: fromLayerPresentation.layerPresentationReducer,
  mapClick: fromMapClick.mapClickReducer
};
