import * as behaviorActions from './behavior.actions';
import {cloneDeep} from 'lodash';

export interface State {
  behaviors: any[];
}

const initialState: State = {
  behaviors: [],
};

export function behaviorReducer(state = initialState, action: any): State {
  switch (action.type) {
    case behaviorActions.ADD_BEHAVIOR:
      const clonedState = cloneDeep(state);
      clonedState.behaviors.push(action.payload);
      return clonedState;
    case behaviorActions.UPDATE_BEHAVIOR:
      const cloneState = cloneDeep(state);
      const behaviorIndex = cloneState.behaviors.findIndex((b) => b.uniqueId === action.payload.uniqueId);
      if (behaviorIndex > -1) {
        cloneState.behaviors[behaviorIndex] = cloneDeep(action.payload);
      }
      return cloneState;
    case behaviorActions.DELETE_BEHAVIOR:
      const clownState = cloneDeep(state);
      clownState.behaviors = clownState.behaviors.filter((b) => b.uniqueId !== action.payload);
      return clownState;
    default:
      return state;
  }
}
