/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';
import { Mode } from '@app/map/utils';

export enum BehaviorActionTypes {
  ADD_BEHAVIOR = '[Behavior] Add',
  UPDATE_BEHAVIOR = '[Behavior] Update',
  UPDATE_MODE = '[Behavior] Update mode for time',
  DELETE_BEHAVIOR = '[Behavior] Delete',
}

export class AddBehavior implements Action {
  readonly type = BehaviorActionTypes.ADD_BEHAVIOR;

  constructor(public payload: any) {
  }
}

export class UpdateBehavior implements Action {
  readonly type = BehaviorActionTypes.UPDATE_BEHAVIOR;

  constructor(public payload: any) {
  }
}

export class UpdateMode implements Action {
  readonly type = BehaviorActionTypes.UPDATE_MODE;

  constructor(public payload: {
    uniqueId: String,
    mode: Mode
  }) {
  }
}

export class DeleteBehavior implements Action {
  readonly type = BehaviorActionTypes.DELETE_BEHAVIOR;

  constructor(public payload: string) {
  }
}

export type BehaviorActionsUnion =
  AddBehavior |
  UpdateBehavior |
  UpdateMode |
  DeleteBehavior;
