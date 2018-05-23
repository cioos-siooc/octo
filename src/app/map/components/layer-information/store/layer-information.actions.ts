import {Action} from '@ngrx/store';

export enum LayerInformationActionTypes {
  SET_LAYER_INFORMATION = '[Layer information] Set layer information',
  SET_SELECTED_LAYER_ID = '[Layer information] Set selected layer id',
}

export class SetLayerInformation implements Action {
  readonly type = LayerInformationActionTypes.SET_LAYER_INFORMATION;

  constructor(public payload: string) {
  }
}

export class SetSelectedLayerId implements Action {
  readonly type = LayerInformationActionTypes.SET_SELECTED_LAYER_ID;

  constructor(public payload: number) {
  }
}

export type LayerInformationActionsUnion =
  SetLayerInformation |
  SetSelectedLayerId;
