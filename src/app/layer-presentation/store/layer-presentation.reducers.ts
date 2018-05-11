import * as layerPresentationActions from './layer-presentation.actions';
import {ClientPresentation} from '../../shared/client-presentation.model';

export interface State {
  layerUniqueId: string;
  clientPresentations: ClientPresentation[];
  currentClientPresentation: ClientPresentation;
}

const initialState: State = {
  layerUniqueId: null,
  clientPresentations: [],
  currentClientPresentation: null
};

export function layerPresentationReducer(state = initialState, action: layerPresentationActions.LayerPresentationActions): State {
  switch (action.type) {
    case layerPresentationActions.SET_LAYER_UNIQUE_ID:
      return {
        ...state,
        layerUniqueId: action.payload
      };
    case layerPresentationActions.SET_CLIENT_PRESENTATIONS:
      return {
        ...state,
        clientPresentations: action.payload
      };
    case layerPresentationActions.SET_CURRENT_CLIENT_PRESENTATION:
      return {
        ...state,
        currentClientPresentation: action.payload
      };
    default:
      return state;
  }
}
