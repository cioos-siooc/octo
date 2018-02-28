import * as fromCatalog from "../catalog/store/catalog.reducer";
import {ActionReducerMap} from "@ngrx/store";
import * as  fromLayer from "../map/store/layer.reducers";

export interface AppState {
  catalog: fromCatalog.State,
  layer: fromLayer.State
}

export const reducers: ActionReducerMap<AppState> = {
  catalog: fromCatalog.catalogReducer,
  layer : fromLayer.layerReducer
};
