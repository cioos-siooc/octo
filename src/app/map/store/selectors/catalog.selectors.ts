import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectCatalogState = createSelector(
  selectMapState,
  state => state.catalog,
);
