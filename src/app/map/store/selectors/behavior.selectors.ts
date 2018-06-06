import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';

export const selectBehaviorState = createSelector(
  selectMapState,
  state => state.behavior,
);
