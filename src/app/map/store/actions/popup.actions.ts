import {Action} from '@ngrx/store';

export enum PopupActionTypes {
  ADD_POPUP = '[Popup] Add',
  DELETE_POPUP = '[Popup] Delete',
  TOGGLE_POPUP = '[Popup] Toggle',
  SET_IS_OPEN = '[Popup] Set is open',
}


export interface PopupStatus {
  id: string;
  isOpen: boolean;
}

export class AddPopup implements Action {
  readonly type = PopupActionTypes.ADD_POPUP;

  constructor(public payload: PopupStatus) {
  }
}

export class DeletePopup implements Action {
  readonly type = PopupActionTypes.DELETE_POPUP;

  constructor(public payload: string) {
  }
}

export class TogglePopup implements Action {
  readonly type = PopupActionTypes.TOGGLE_POPUP;

  constructor(public payload: string) {
  }
}

export class SetIsOpen implements Action {
  readonly type = PopupActionTypes.SET_IS_OPEN;

  constructor(public payload: {popupId: string, isOpen: boolean}) {
  }
}

export type PopupActionsUnion =
  AddPopup |
  DeletePopup |
  SetIsOpen |
  TogglePopup;
