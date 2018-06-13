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

export class AddBaseLayer implements Action {
  readonly type = BaseLayerActionTypes.ADD_BASE_LAYER;

  constructor(public payload: Layer) {
  }
}

export class SetCurrentBaseLayer implements Action {
  readonly type = BaseLayerActionTypes.SET_CURRENT_BASE_LAYER;

  constructor(public payload: Layer) {
  }
}

export type BaseLayerActionsUnion =
  AddBaseLayer |
  SetCurrentBaseLayer;
