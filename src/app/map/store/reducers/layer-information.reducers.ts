import {LayerInformationActionsUnion, LayerInformationActionTypes} from '../actions/layer-information.actions';

export interface State {
  informationHtml: string;
  selectedLayerId: number;
}

export const initialState: State = {
  informationHtml: null,
  selectedLayerId: null
};

export function layerInformationReducer(state = initialState, action: LayerInformationActionsUnion): State {
  switch (action.type) {
    case LayerInformationActionTypes.SET_LAYER_INFORMATION:
      return {
        ...state,
        informationHtml: action.payload
      };
    case LayerInformationActionTypes.SET_SELECTED_LAYER_ID:
      return {
        ...state,
        selectedLayerId: action.payload
      };
    default:
      return state;
  }
}
