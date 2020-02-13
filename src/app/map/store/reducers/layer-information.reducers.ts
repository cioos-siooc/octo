/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {LayerInformationActionsUnion, LayerInformationActionTypes} from '../actions/layer-information.actions';

/**
 * Stores the HTML layerInformation for the currently selected layer
 *
 * @export
 * @interface LayerInformationState
 */
export interface LayerInformationState {
  informationHtml: string;
  selectedLayerId: number;
}

export const initialState: LayerInformationState = {
  informationHtml: null,
  selectedLayerId: null
};

export function layerInformationReducer(state = initialState, action: LayerInformationActionsUnion): LayerInformationState {
  switch (action.type) {
    case LayerInformationActionTypes.SET_LAYER_INFORMATION:
      return <LayerInformationState>{
        ...state,
        informationHtml: action.payload
      };
    case LayerInformationActionTypes.SET_SELECTED_LAYER_ID:
      return <LayerInformationState>{
        ...state,
        selectedLayerId: action.payload
      };
    default:
      return state;
  }
}
