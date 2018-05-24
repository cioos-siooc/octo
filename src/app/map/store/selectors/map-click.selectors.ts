import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectMapClickState = createSelector(
  selectMapState,
  state => state.mapClick,
);
