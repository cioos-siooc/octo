/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';
import {Layer} from '@app/shared/models';

export enum MapClickActionTypes {
  SET_MAP_CLICK_INFO = '[Map click] Set info',
  SET_MAP_CLICK_LAYER_UNIQUE_ID = '[Map click] Set layer unique id',
}


export class SetMapClickInfo implements Action {
  readonly type = MapClickActionTypes.SET_MAP_CLICK_INFO;

  constructor(public payload: any) {
  }
}

export class SetMapClickLayerUniqueId implements Action {
  readonly type = MapClickActionTypes.SET_MAP_CLICK_LAYER_UNIQUE_ID;

  constructor(public payload: string) {
  }
}

export type MapClickActionsUnion =
  SetMapClickInfo |
  SetMapClickLayerUniqueId;
