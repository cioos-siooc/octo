import {Action} from '@ngrx/store';

export const ADD_POPUP = 'ADD_POPUP';
export const DELETE_POPUP = 'DELETE_POPUP';
export const TOGGLE_POPUP = 'TOGGLE_POPUP';

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

export type PopupActions =
  AddPopup |
  DeletePopup |
  TogglePopup;
