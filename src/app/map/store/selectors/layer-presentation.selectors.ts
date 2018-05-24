import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectLayerPresentationState = createSelector(
  selectMapState,
  state => state.layerPresentation,
);
