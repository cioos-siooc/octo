/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Action} from '@ngrx/store';

export enum BehaviorActionTypes {
  ADD_BEHAVIOR = '[Behavior] Add',
  UPDATE_BEHAVIOR = '[Behavior] Update',
  DELETE_BEHAVIOR = '[Behavior] Delete',
}

/**
 * Creates an instance of AddBehavior which can be dispatched to the store
 *  AddBehavior appends the given behavior to the behavior reducer
 *
 * @export
 * @class AddBehavior
 * @implements {Action}
 */
export class AddBehavior implements Action {
  readonly type = BehaviorActionTypes.ADD_BEHAVIOR;

  /**
   *Creates an instance of AddBehavior.
   * @param {*} payload - The behavior object to be added to the reducer
   * @memberof AddBehavior
   */
  constructor(public payload: any) {
  }
}

/**
 * Creates an instance of UpdateBehavior which can be dispatched to the store
 *  UpdateBehavior updates the given Behavior based on the Behavior's uniqueId
 *
 * @export
 * @class UpdateBehavior
 * @implements {Action}
 */
export class UpdateBehavior implements Action {
  readonly type = BehaviorActionTypes.UPDATE_BEHAVIOR;

  /**
   *Creates an instance of UpdateBehavior.
   * @param {*} payload - The behavior object to be updated in the reducer
   * @memberof UpdateBehavior
   */
  constructor(public payload: any) {
  }
}

/**
 * Creates an instance of DeleteBehavior which can be dispatched to the store
 *  DeleteBehavior removes a behavior from the store based on the given behavior uniqueId
 *
 * @export
 * @class DeleteBehavior
 * @implements {Action}
 */
export class DeleteBehavior implements Action {
  readonly type = BehaviorActionTypes.DELETE_BEHAVIOR;

  /**
   *Creates an instance of DeleteBehavior.
   * @param {string} payload - The uniqueId of the behavior to be removed from the store
   * @memberof DeleteBehavior
   */
  constructor(public payload: string) {
  }
}

export type BehaviorActionsUnion =
  AddBehavior |
  UpdateBehavior |
  DeleteBehavior;
