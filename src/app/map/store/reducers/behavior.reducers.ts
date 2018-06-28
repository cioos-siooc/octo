/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {BehaviorActionsUnion, BehaviorActionTypes} from '../actions/behavior.actions';
import {cloneDeep} from 'lodash';

export interface BehaviorState {
  behaviors: any[];
}

export const initialState: BehaviorState = {
  behaviors: [],
};

export function behaviorReducer(state = initialState, action: BehaviorActionsUnion): BehaviorState {
  switch (action.type) {
    case BehaviorActionTypes.ADD_BEHAVIOR:
      const clonedState = cloneDeep(state);
      clonedState.behaviors.push(cloneDeep(action.payload));
      return clonedState;
    case BehaviorActionTypes.UPDATE_BEHAVIOR:
      const cloneState = cloneDeep(state);
      const behaviorIndex = cloneState.behaviors.findIndex((b) => b.uniqueId === action.payload.uniqueId);
      if (behaviorIndex > -1) {
        cloneState.behaviors[behaviorIndex] = cloneDeep(action.payload);
      }
      return cloneState;
    case BehaviorActionTypes.DELETE_BEHAVIOR:
      const clownState = cloneDeep(state);
      clownState.behaviors = clownState.behaviors.filter((b) => b.uniqueId !== action.payload);
      return clownState;
    default:
      return state;
  }
}
