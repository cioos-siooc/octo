import {Action} from '@ngrx/store';

export const SET_LAYER_INFORMATION = 'LAYER_INFORMATION_SET';
export const SET_SELECTED_LAYER_ID = 'LAYER_INFORMATION_SET_SELECTED_LAYER_ID';

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
