import * as popupActions from './popup.actions';
import {PopupStatus} from './popup.actions';
import {cloneDeep} from 'lodash';


export interface State {
  popupStatuses: Array<PopupStatus>;
}

const initialState: State = {
  popupStatuses: [],
};


export function popupReducer(state = initialState, action: popupActions.PopupActions) {
  switch (action.type) {
    case popupActions.ADD_POPUP:
      const clonedState = cloneDeep(state);
      const isAlresadyInArray = clonedState.popupStatuses.some((pS) => {
        return pS.id === action.payload.id;
      });
      if (isAlresadyInArray) {
        return clonedState;
      }
      clonedState.popupStatuses.push({...action.payload});
      return clonedState;
    case popupActions.DELETE_POPUP:
      const clownState = cloneDeep(state);
      return clownState.filter((p: PopupStatus) => {
        return p.id !== action.payload;
      });
    case popupActions.TOGGLE_POPUP:
      const cloneState = cloneDeep(state);
      const popupStatus = cloneState.popupStatuses.filter((ps) => {
        return ps.id === action.payload;
      })[0];
      popupStatus.isOpen = !popupStatus.isOpen;
      return cloneState;
    case popupActions.SET_IS_OPEN:
      const newState = cloneDeep(state);
      const pStatus = newState.popupStatuses.filter((ps) => {
        return ps.id === action.payload.popupId;
      })[0];
      pStatus.isOpen = action.payload.isOpen;
      return newState;
    default:
      return state;
  }
}

