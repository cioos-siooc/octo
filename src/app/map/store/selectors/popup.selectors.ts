import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectPopupState = createSelector(
  selectMapState,
  state => state.popup,
);
