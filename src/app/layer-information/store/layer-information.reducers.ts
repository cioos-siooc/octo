import * as layerInformationActions from './layer-information.actions';

export interface State {
  informationHtml: string;
  selectedLayerId: number;
}

const initialState: State = {
  informationHtml: null,
  selectedLayerId: null
};

export function layerInformationReducer(state = initialState, action: layerInformationActions.LayerInformationActions): State {
  switch (action.type) {
    case layerInformationActions.SET_LAYER_INFORMATION:
      return {
        ...state,
        informationHtml: action.payload
      };
    case layerInformationActions.SET_SELECTED_LAYER_ID:
      return {
        ...state,
        selectedLayerId: action.payload
      };
    default:
      return state;
  }
}
