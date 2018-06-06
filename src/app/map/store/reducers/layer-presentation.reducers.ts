import {LayerPresentationActionsUnion, LayerPresentationActionTypes} from '../actions/layer-presentation.actions';
import {ClientPresentation} from '../../../shared/models/client-presentation.model';

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
      return {
        ...state,
        layerUniqueId: action.payload
      };
    case LayerPresentationActionTypes.SET_CLIENT_PRESENTATIONS:
      return {
        ...state,
        clientPresentations: action.payload
      };
    case LayerPresentationActionTypes.SET_CURRENT_CLIENT_PRESENTATION:
      return {
        ...state,
        currentClientPresentation: action.payload
      };
    default:
      return state;
  }
}
