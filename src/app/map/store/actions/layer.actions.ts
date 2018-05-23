import {Action} from '@ngrx/store';
import {Layer} from '../../../shared/layer.model';
import {ClientPresentation} from '../../../shared/client-presentation.model';

export enum LayerActionTypes {
  FETCH_LAYER = '[Layer] Fetch',
  FETCH_CLIENT_PRESENTATIONS = '[Layer] Fetch client presentations',
  ADD_LAYER = '[Layer] Add',
  DELETE_LAYER = '[Layer] Delete',
  UPDATE_LAYER = '[Layer] Update',
  MOVE_UP_LAYER = '[Layer] Move up',
  MOVE_DOWN_LAYER = '[Layer] Move down',
  SET_CLIENT_PRESENTATION = '[Layer] Set client presentation',
  FETCH_CLICK_STRATEGY = '[Layer] Fetch click strategy',
  FETCH_CLICK_FORMATTER = '[Layer] Fetch click formatter',
}

export class FetchLayer implements Action {
  readonly type = LayerActionTypes.FETCH_LAYER;

  constructor(public payload: { layerId: number, uniqueId: string }) {
  }
}

export class FetchClientPresentations implements Action {
  readonly type = LayerActionTypes.FETCH_CLIENT_PRESENTATIONS;

  constructor(public payload: Layer) {
  }
}

export class AddLayer implements Action {
  readonly type = LayerActionTypes.ADD_LAYER;

  constructor(public payload: Layer) {
  }
}

export class DeleteLayer implements Action {
  readonly type = LayerActionTypes.DELETE_LAYER;

  constructor(public payload: string) {
  }
}

export class UpdateLayer implements Action {
  readonly type = LayerActionTypes.UPDATE_LAYER;

  constructor(public payload: Layer) {
  }
}

export class SetClientPresentation implements Action {
  readonly type = LayerActionTypes.SET_CLIENT_PRESENTATION;

  constructor(public payload: { uniqueId: string, clientPresentation: ClientPresentation }) {
  }
}

export class FetchClickStrategy implements Action {
  readonly type = LayerActionTypes.FETCH_CLICK_STRATEGY;

  constructor(public payload: Layer) {
  }
}
export class MoveUpLayer implements Action {
  readonly type = LayerActionTypes.MOVE_UP_LAYER;

  constructor(public payload: string) {
  }
}
export class MoveDownLayer implements Action {
  readonly type = LayerActionTypes.MOVE_DOWN_LAYER;

  constructor(public payload: string) {
  }
}
export class FetchClickFormatter implements Action {
  readonly type = LayerActionTypes.FETCH_CLICK_FORMATTER;

  constructor(public payload: Layer) {
  }
}


export type LayerActionsUnion =
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
