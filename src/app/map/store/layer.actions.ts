import {Action} from '@ngrx/store';
import {Layer} from '../../shared/layer.model';
import {ClientPresentation} from '../../shared/client-presentation.model';


export const FETCH_LAYER = 'LAYER_FETCH';
export const FETCH_CLIENT_PRESENTATIONS = 'LAYER_FETCH_CLIENT_PRESENTATIONS';
export const ADD_LAYER = 'LAYER_ADD';
export const DELETE_LAYER = 'LAYER_DELETE';
export const UPDATE_LAYER = 'LAYER_UPDATE';
export const MOVE_UP_LAYER = 'LAYER_MOVE_UP';
export const MOVE_DOWN_LAYER = 'LAYER_MOVE_DOWN';
export const SET_CLIENT_PRESENTATION = 'LAYER_SET_CLIENT_PRESENTATION';
export const FETCH_CLICK_STRATEGY = 'LAYER_FETCH_CLICK_STRATEGY';
export const FETCH_CLICK_FORMATTER = 'LAYER_FETCH_CLICK_FORMATTER';
export class FetchLayer implements Action {
  readonly type = FETCH_LAYER;

  constructor(public payload: { layerId: number, uniqueId: string }) {
  }
}

export class FetchClientPresentations implements Action {
  readonly type = FETCH_CLIENT_PRESENTATIONS;

  constructor(public payload: Layer) {
  }
}

export class AddLayer implements Action {
  readonly type = ADD_LAYER;

  constructor(public payload: Layer) {
  }
}

export class DeleteLayer implements Action {
  readonly type = DELETE_LAYER;

  constructor(public payload: string) {
  }
}

export class UpdateLayer implements Action {
  readonly type = UPDATE_LAYER;

  constructor(public payload: Layer) {
  }
}

export class SetClientPresentation implements Action {
  readonly type = SET_CLIENT_PRESENTATION;

  constructor(public payload: { uniqueId: string, clientPresentation: ClientPresentation }) {
  }
}

export class FetchClickStrategy implements Action {
  readonly type = FETCH_CLICK_STRATEGY;

  constructor(public payload: Layer) {
  }
}
export class MoveUpLayer implements Action {
  readonly type = MOVE_UP_LAYER;

  constructor(public payload: string) {
  }
}
export class MoveDownLayer implements Action {
  readonly type = MOVE_DOWN_LAYER;

  constructor(public payload: string) {
  }
}
export class FetchClickFormatter implements Action {
  readonly type = FETCH_CLICK_FORMATTER;

  constructor(public payload: Layer) {
  }
}


export type LayerActions =
  FetchLayer |
  AddLayer |
  DeleteLayer |
  FetchClientPresentations |
  FetchClickStrategy |
  FetchClickFormatter |
  SetClientPresentation |
  MoveUpLayer |
  MoveDownLayer |
  UpdateLayer;
