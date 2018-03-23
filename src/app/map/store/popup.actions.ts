import {Action} from '@ngrx/store';

export const ADD_POPUP = 'POPUP_ADD';
export const DELETE_POPUP = 'POPUP_DELETE';
export const TOGGLE_POPUP = 'POPUP_TOGGLE';
export const SET_IS_OPEN = 'POPUP_SET_IS_OPEN';

export interface PopupStatus {
  id: string;
  isOpen: boolean;
}

export class AddPopup implements Action {
  readonly type = ADD_POPUP;

  constructor(public payload: PopupStatus) {
  }
}

export class DeletePopup implements Action {
  readonly type = DELETE_POPUP;

  constructor(public payload: string) {
  }
}

export class TogglePopup implements Action {
  readonly type = TOGGLE_POPUP;

  constructor(public payload: string) {
  }
}

export class SetIsOpen implements Action {
  readonly type = SET_IS_OPEN;

  constructor(public payload: {popupId: string, isOpen: boolean}) {
  }
}

export type PopupActions =
  AddPopup |
  DeletePopup |
  SetIsOpen |
  TogglePopup;
