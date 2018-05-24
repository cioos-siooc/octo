import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectLayerState = createSelector(
  selectMapState,
  state => state.layer,
);
