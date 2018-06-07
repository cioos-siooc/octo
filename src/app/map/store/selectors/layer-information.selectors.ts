import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers';

export const selectLayerInformationState = createSelector(
  selectMapState,
  state => state.layerInformation,
);
