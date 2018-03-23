import {Action} from '@ngrx/store';
import {ClientPresentation} from '../../shared/client-presentation.model';

export const SET_LAYER_UNIQUE_ID = 'LAYER_PRESENTATION_SET_LAYER_UNIQUE_ID';
export const SET_CLIENT_PRESENTATIONS = 'LAYER_PRESENTATION_SET_PRESENTATIONS';
export const SET_CURRENT_CLIENT_PRESENTATION = 'LAYER_PRESENTATION_SET_CURRENT';


export class SetLayerUniqueId implements Action {
  readonly type = SET_LAYER_UNIQUE_ID;

  constructor(public payload: string) {
  }
}

export class SetClientPresentations implements Action {
  readonly type = SET_CLIENT_PRESENTATIONS;

  constructor(public payload: ClientPresentation[]) {
  }
}

export class SetCurrentClientPresentation implements Action {
  readonly type = SET_CURRENT_CLIENT_PRESENTATION;

  constructor(public payload: ClientPresentation) {
  }
}

export type LayerPresentationActions =
  SetLayerUniqueId |
  SetClientPresentations |
  SetCurrentClientPresentation;

