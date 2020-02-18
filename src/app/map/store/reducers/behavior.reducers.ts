/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {BehaviorActionsUnion, BehaviorActionTypes} from '../actions/behavior.actions';
import {cloneDeep} from 'lodash';

/**
 * Stores a list of Behaviors with their associated state.
 *
 * @export
 * @interface BehaviorState
 */
export interface BehaviorState {
  behaviors: any[];
}

export const initialState: BehaviorState = {
  behaviors: [],
};

export function behaviorReducer(state = initialState, action: BehaviorActionsUnion): BehaviorState {
  switch (action.type) {
    case BehaviorActionTypes.ADD_BEHAVIOR:
      const clonedState = {...state};
      clonedState.behaviors.push(cloneDeep(action.payload));
      return clonedState;
    case BehaviorActionTypes.UPDATE_BEHAVIOR:
      const cloneState = {...state};
      const behaviorIndex = cloneState.behaviors.findIndex((b) => b.uniqueId === action.payload.uniqueId);
      if (behaviorIndex > -1) {
        cloneState.behaviors[behaviorIndex] = cloneDeep(action.payload);
      }
      return cloneState;
    case BehaviorActionTypes.UPDATE_MODE:
      const bIndex = state.behaviors.findIndex((b) => b.uniqueId === action.payload.uniqueId);
      if (bIndex > -1) {
        const newBehavior = {
          ...state.behaviors[bIndex],
          mode: action.payload.mode
        };
        const newBehaviors = [...state.behaviors];
        newBehaviors[bIndex] = newBehavior;
        return {
          ...state,
          behaviors: newBehaviors
        };
      }
      return state;
    case BehaviorActionTypes.DELETE_BEHAVIOR:
      const clownState = {...state};
      clownState.behaviors = clownState.behaviors.filter((b) => b.uniqueId !== action.payload);
      return clownState;
    default:
      return state;
  }
}
