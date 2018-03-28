import {Action} from '@ngrx/store';
import {Layer} from '../../shared/layer.model';

export const SET_MAP_CLICK_INFO = 'MAP_CLICK_SET_INFO';
export const SET_MAP_CLICK_LAYER = 'MAP_CLICK_SET_LAYER';

export class SetMapClickInfo implements Action {
  readonly type = SET_MAP_CLICK_INFO;

  constructor(public payload: any) {
  }
}

export class SetMapClickLayer implements Action {
  readonly type = SET_MAP_CLICK_LAYER;

  constructor(public payload: Layer) {
  }
}

export type MapClickActions =
  SetMapClickInfo |
  SetMapClickLayer;
