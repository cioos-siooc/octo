import {Action} from "@ngrx/store"
import {Layer} from "../../shared/layer.model";


export const FETCH_LAYER = 'FETCH_LAYER';
export const ADD_LAYER = 'ADD_LAYER';
export const DELETE_LAYER = 'DELETE_LAYER';
export const UPDATE_LAYER = 'UPDATE_LAYER';

export class FetchLayer implements Action {
  readonly type = FETCH_LAYER;

  constructor(public payload: number) {}
}

export class AddLayer implements Action {
  readonly type = ADD_LAYER;

  constructor(public payload: Layer) {}
}

export class DeleteLayer  implements Action {
  readonly type = DELETE_LAYER;
}

export class UpdateLayer implements Action {
  readonly type = UPDATE_LAYER;
}

export type LayerActions =
  FetchLayer |
  AddLayer |
  DeleteLayer |
  UpdateLayer;
