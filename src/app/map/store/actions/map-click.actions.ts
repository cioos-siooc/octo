import {Action} from '@ngrx/store';
import {Layer} from '@app/shared/models';

export enum MapClickActionTypes {
  SET_MAP_CLICK_INFO = '[Map click] Set info',
  SET_MAP_CLICK_LAYER = '[Map click] Set layer',
}


export class SetMapClickInfo implements Action {
  readonly type = MapClickActionTypes.SET_MAP_CLICK_INFO;

  constructor(public payload: any) {
  }
}

export class SetMapClickLayer implements Action {
  readonly type = MapClickActionTypes.SET_MAP_CLICK_LAYER;

  constructor(public payload: Layer) {
  }
}

export type MapClickActionsUnion =
  SetMapClickInfo |
  SetMapClickLayer;
