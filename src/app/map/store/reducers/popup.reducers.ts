/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {PopupActionsUnion, PopupActionTypes, PopupStatus} from '../actions/popup.actions';
import {cloneDeep} from 'lodash';


export interface PopupState {
  popupStatuses: PopupStatus[];
}

export const initialState: PopupState = {
  popupStatuses: [],
};


export function popupReducer(state: PopupState = initialState, action: PopupActionsUnion): PopupState {
  switch (action.type) {
    case PopupActionTypes.ADD_POPUP:
      const clonedState = cloneDeep(state);
      const isAlreadyInArray = clonedState.popupStatuses.some((pS) => {
        return pS.id === (<PopupStatus>action.payload).id;
      });
      if (isAlreadyInArray) {
        return clonedState;
      }
      clonedState.popupStatuses.push(<PopupStatus>{...action.payload});
      return clonedState;
    case PopupActionTypes.DELETE_POPUP:
      const clownState = cloneDeep(state);
      clownState.popupStatuses = clownState.popupStatuses.filter((p: PopupStatus) => {
        return p.id !== action.payload;
      });
      return clownState;
    case PopupActionTypes.TOGGLE_POPUP:
      const cloneState = cloneDeep(state);
      const popupStatus = cloneState.popupStatuses.find((ps) => {
        return ps.id === action.payload;
      });
      popupStatus.isOpen = !popupStatus.isOpen;
      return cloneState;
    case PopupActionTypes.SET_IS_OPEN:
      const newState = cloneDeep(state);
      const pStatus = newState.popupStatuses.find((ps) => {
        return ps.id === (<any>action.payload).popupId;
      });
      if (pStatus != null) {
        pStatus.isOpen = cloneDeep(action.payload).isOpen;
        return newState;
      } else {
        return newState;
      }
    default:
      return state;
  }
}

