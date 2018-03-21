import {Action} from '@ngrx/store';

export const SET_LAYER_INFORMATION = 'SET_LAYER_INFORMATION';
export const SET_SELECTED_LAYER_ID = 'SET_SELECTED_LAYER_ID';

export class SetLayerInformation implements Action {
  readonly type = SET_LAYER_INFORMATION;

  constructor(public payload: string) {
  }
}

export class SetSelectedLayerId implements Action {
  readonly type = SET_SELECTED_LAYER_ID;

  constructor(public payload: number) {
  }
}

export type LayerInformationActions =
  SetLayerInformation |
  SetSelectedLayerId;
