import {createSelector} from '@ngrx/store';
import {selectMapState} from '../reducers/map.reducers';

export const selectLayerInformationState = createSelector(
  selectMapState,
  state => state.layerInformation,
);
