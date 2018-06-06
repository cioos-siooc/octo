import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';

export const selectCatalogState = createSelector(
  selectMapState,
  state => state.catalog,
);
