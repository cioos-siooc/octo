import {Layer} from '../../shared/layer.model';
import {Action} from '@ngrx/store';

export const ADD_BASE_LAYER = 'BASE_LAYER_ADD';
export const SET_CURRENT_BASE_LAYER = 'BASE_LAYER_SET_CURRENT';

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
