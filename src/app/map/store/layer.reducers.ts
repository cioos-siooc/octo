import {Layer} from "../../shared/layer.model";
import * as layerActions from './layer.actions';

export interface State {
  layers: Layer[],
}

const initialState: State = {
  layers: [],
};

export function layerReducer(state = initialState, action: layerActions.LayerActions): State {
  switch (action.type) {
    case layerActions.ADD_LAYER:
      return {
        ...state,
        layers: [...state.layers, action.payload]
      };
    // case layerActions.UPDATE_LAYER:
    //   const oldLayer = state.layers[(<UpdateLayer>action).payload.index];
    //   const updatedRecipe = {
    //     ...oldLayer,
    //     ...(<UpdateLayer>action).payload.updatedLayer
    //   };
    //   const recipes = [...state.layers];
    //   recipes[(<UpdateLayer>action).payload.index] = updatedRecipe;
    //   return {
    //     ...state,
    //     layers: recipes
    //   };
    default:
      return state;
  }
}

