/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {LayerPresentationActionsUnion, LayerPresentationActionTypes} from '../actions/layer-presentation.actions';
import {ClientPresentation} from '@app/shared/models';
import {cloneDeep} from 'lodash';

export interface LayerPresentationState {
  layerUniqueId: string;
  clientPresentations: ClientPresentation[];
  currentClientPresentation: ClientPresentation;
}

export const initialState: LayerPresentationState = {
  layerUniqueId: null,
  clientPresentations: [],
  currentClientPresentation: null
};

export function layerPresentationReducer(state = initialState, action: LayerPresentationActionsUnion): LayerPresentationState {
  switch (action.type) {
    case LayerPresentationActionTypes.SET_LAYER_UNIQUE_ID:
      return <LayerPresentationState>{
        ...state,
        layerUniqueId: action.payload
      };
    case LayerPresentationActionTypes.SET_CLIENT_PRESENTATIONS:
      return <LayerPresentationState>{
        ...state,
        clientPresentations: cloneDeep(action.payload)
      };
    case LayerPresentationActionTypes.SET_CURRENT_CLIENT_PRESENTATION:
      return <LayerPresentationState>{
        ...state,
        currentClientPresentation: cloneDeep(action.payload)
      };
    default:
      return state;
  }
}
