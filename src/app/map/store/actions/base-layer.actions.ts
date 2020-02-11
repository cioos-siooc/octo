/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Layer} from '@app/shared/models/layer.model';
import {Action} from '@ngrx/store';

export enum BaseLayerActionTypes {
  ADD_BASE_LAYER = '[Base layer] Add',
  SET_CURRENT_BASE_LAYER = '[Base layer] Set current',
}

/**
 * Creates an instance of AddBaseLayer which can be dispatched to the store
 * AddBaseLayer appends the given layer to the BaseLayer reducer
 *
 * @export
 * @class AddBaseLayer
 * @implements {Action}
 */
export class AddBaseLayer implements Action {
  readonly type = BaseLayerActionTypes.ADD_BASE_LAYER;

  /**
   *Creates an instance of AddBaseLayer.
   * @param {Layer} payload - The Layer to be added to the reducer
   * @memberof AddBaseLayer
   */
  constructor(public payload: Layer) {
  }
}

/**
 * Creates an instance of SetCurrentBaseLayer which can be dispatched to the store
 * SetCurrentBaseLayer sets the currentBaseLayer parameter in the reducer to the given layer
 * This layer should already be included in the reducer before it is set to the currentBaseLayer
 *
 * @export
 * @class SetCurrentBaseLayer
 * @implements {Action}
 */
export class SetCurrentBaseLayer implements Action {
  readonly type = BaseLayerActionTypes.SET_CURRENT_BASE_LAYER;

  /**
   *Creates an instance of SetCurrentBaseLayer.
   * @param {Layer} payload - The layer to be set as the currentBaseLayer
   * @memberof SetCurrentBaseLayer
   */
  constructor(public payload: Layer) {
  }
}

export type BaseLayerActionsUnion =
  AddBaseLayer |
  SetCurrentBaseLayer;
