import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectBehaviorState = createSelector(
  selectMapState,
  state => state.behavior,
);
