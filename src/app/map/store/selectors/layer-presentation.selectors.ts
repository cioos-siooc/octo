import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';

export const selectLayerPresentationState = createSelector(
  selectMapState,
  state => state.layerPresentation,
);
