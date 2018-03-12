import {Layer} from '../../shared/layer.model';
import {Action} from '@ngrx/store';

export const ADD_BASE_LAYER = 'ADD_BASE_LAYER';
export const SET_CURRENT_BASE_LAYER = 'SET_CURRENT_BASE_LAYER';

export class AddBaseLayer implements Action {
  readonly type = ADD_BASE_LAYER;

  constructor(public payload: Layer) {
  }
}

export class SetCurrentBaseLayer implements Action {
  readonly type = SET_CURRENT_BASE_LAYER;

  constructor(public payload: Layer) {
  }
}

export type BaseLayerActions =
  AddBaseLayer |
  SetCurrentBaseLayer;
