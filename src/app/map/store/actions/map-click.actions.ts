/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';
import { Layer, MapClickInfo } from '@app/shared/models';

export enum MapClickActionTypes {
  SET_MAP_CLICK_INFO = '[Map click] Set info',
  CLEAR_MAP_CLICK_INFO = '[Map click] Clear info'
}


/**
 * Creates an instance of SetMapClickInfo which can be dispatched to the store
 *  SetMapClickInfo sets the current clickInfo for a particular layer
 *
 * @export
 * @class SetMapClickInfo
 * @implements {Action}
 */
export class SetMapClickInfo implements Action {
  readonly type = MapClickActionTypes.SET_MAP_CLICK_INFO;

  /**
   *Creates an instance of SetMapClickInfo.
   * @param {MapClickInfo} payload - The MapClickInfo which will be set
   * @memberof SetMapClickInfo
   */
  constructor(public payload: MapClickInfo) {}
}

/**
 * Creates an instance of ClearMapClickInfo which can be dispatched to the store
 *  ClearMapClickInfo removes the current clickInfo for a particular layer
 *
 * @export
 * @class ClearMapClickInfo
 * @implements {Action}
 */
export class ClearMapClickInfo implements Action {
  readonly type = MapClickActionTypes.CLEAR_MAP_CLICK_INFO;

  /**
   *Creates an instance of ClearMapClickInfo.
   * @param {number} payload - The ID of the target layer
   * @memberof ClearMapClickInfo
   */
  constructor(public payload: number) {}
}

export type MapClickActionsUnion =
  SetMapClickInfo |
  ClearMapClickInfo;
