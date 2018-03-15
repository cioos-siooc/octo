import * as LayerInformationActions from './layer-information.actions';

export interface State {
  informationHtml: string;
  selectedLayerId: number;
}

const initialState: State = {
  informationHtml: null,
  selectedLayerId: null
};

export function layerInformationReducer(state = initialState, action: LayerInformationActions.LayerInformationActions) {
  switch (action.type) {
    case LayerInformationActions.SET_LAYER_INFORMATION:
      return {
        ...state,
        informationHtml: action.payload
      };
    case LayerInformationActions.SET_SELECTED_LAYER_ID:
      return {
        ...state,
        selectedLayerId: action.payload
      };
    default:
      return state;
  }
}
